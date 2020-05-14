import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isOpen: boolean;
  public mediaMatches: boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.mediaMatches = result.matches;
        this.isOpen = !result.matches;
        // this.onToggle.emit(this.isOpen);
      });
  }

  ngOnInit(): void {
  }

  toggleSidebar() {
    if (this.mediaMatches) {
      this.isOpen = false;
    }
    this.onToggle.emit(this.isOpen);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
