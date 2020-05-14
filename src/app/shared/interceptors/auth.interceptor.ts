import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.isAuth()) {
      req = req.clone({
        setParams: {
          // firebase name
          auth: this._authService.token
        }
      });
      return next.handle(req)
        .pipe(
          tap(() => {
            console.log('Interceptor');
          }),
          catchError((error: HttpErrorResponse) => {
            console.log('HttpInterceptor', error);

            if (error.status === 401) {
              this._authService.logout();
              this._router.navigate(['/login'], {
                queryParams: {
                  authFailed: true
                }
              });
            }

            return throwError(error);
          })
        );
    }
  }

}
