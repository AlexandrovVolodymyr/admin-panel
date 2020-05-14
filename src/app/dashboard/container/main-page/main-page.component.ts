import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public isOpen: boolean;
  public mode: string;

  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    breakpointObserver: BreakpointObserver,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.mode = 'side';
    breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(result => {
        if (result.matches) {
          this.mode = 'push';
        } else {
          this.mode = 'side';
        }
        this.isOpen = !result.matches;
      });
  }

  ngOnInit(): void {
  }

  public toggle(open: boolean) {
    this.isOpen = open;
  }

  public logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  public backdropClick() {
    this.isOpen = false;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
