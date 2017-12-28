import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { ColumnOptions } from '../../models/column-options';
import { DataTableSource } from './data-table-source';

@Component({
  selector: 'app-visit-history-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() data$: Observable<any[]>;
  @Input() columns: ColumnOptions[];
  displayedColumns: string[];
  initialPageSize: number;
  dataSource: DataTableSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // Determine initial page size using inner height of window at component init
    const surroundingElementsPx = 281;
    const cellPx = 49;
    this.initialPageSize = Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
    this.dataSource = new DataTableSource(this.data$, this.paginator);
    this.displayedColumns = this.columns.map(column => column.columnDef);
  }
}
