import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyUnauthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._authService.isAuth()) {
      return true;
    } else {
      console.warn('Only for unathorized users.');
      this._router.navigate(['/dashboard']);
      return false;
    }
  }

}
