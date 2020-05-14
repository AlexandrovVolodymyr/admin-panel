import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../shared/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient) { }

  get token(): string {
    const expiredDate = new Date(localStorage.getItem('token-fb-exp'));
    if (new Date() > expiredDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token-fb');
  }

  public login(user: User): Observable<any> {
    // user@gmail.com
    // 123456

    user.returnSecureToken = true; // firebase field for token expired
    return this._http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  public logout() {
    this.setToken(null);
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такой email не существует');
        break;
    }

    setTimeout(() => this.error$.next(''), 5000);

    return throwError(error);
  }

  private setToken(response: any) {
    console.log(response);
    if (response) {
      // current time + token time * 1000 (miliseconds)
      const expiresDate = new Date(new Date().getTime() + response.expiresIn * 1000);
      localStorage.setItem('token-fb', response.idToken);
      localStorage.setItem('token-fb-exp', expiresDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
