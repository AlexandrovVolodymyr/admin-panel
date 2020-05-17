import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TableService } from '../../services/table.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  public dataSource: any;
  public displayedColumns: string[];
  public paginationSizeOptions: number[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private _unsubscribe: Subject<void> = new Subject();

  constructor(private _tableService: TableService) {
    this.displayedColumns = ['userId', 'id', 'title', 'body'];
    this.paginationSizeOptions = [5, 10, 20, 100];
  }

  ngOnInit(): void {
    this._tableService.getUsers()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(res => this.dataSource = res);
  }

  public ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
