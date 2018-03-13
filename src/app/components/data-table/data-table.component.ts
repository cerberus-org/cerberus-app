import { DataSource } from '@angular/cdk/table';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ColumnOptions } from '../../models';

/**
 * Provides what data should be rendered in the table.
 * Note that the data source can retrieve its data in any way.
 * It is not the data source's responsibility to manage the underlying data.
 * Instead, it only needs to take the data and send the table
 * exactly what should be rendered.
 */
export class DataTableSource extends DataSource<any> implements OnDestroy {
  data: any[] = [];
  subscription: Subscription;

  constructor(private data$: Observable<any[]>, private paginator: MatPaginator) {
    super();
    if (this.data$) {
      this.subscription = this.data$
        .subscribe(data => this.data = data);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  connect(): Observable<any[]> {
    return this.data$ ? Observable.merge(this.paginator.page, this.data$).map(() => {
      return this.getPageData();
    }) : Observable.of([]);
  }

  getPageData(): any[] {
    const data = this.data.slice();
    // Grab the page's slice of data based on the current page and items per page.
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  disconnect() {}
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input() data$: Observable<any[]>;
  @Input() columnOptions: ColumnOptions[];
  @Input() showDelete: boolean;
  @Output() updateItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
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
    this.displayedColumns = this.columnOptions.map(column => column.columnDef);
    if (this.showDelete) {
      this.displayedColumns.push('delete');
    }
  }

  isDataSourceAndData(): boolean {
    return this.dataSource && this.dataSource.data ? true : false;
  }

  /**
   * Handles delete button click events by emitting a delete item event.
   * @param item - the item to be deleted
   */
  onClickDelete(item: any): void {
    this.deleteItem.emit(item);
  }

  /**
   * Handles select option events by emitting the item modified with the selected option.
   * @param value - the value to apply
   * @param item - the table item to modify
   * @param key - the property to modify
   */
  onSelectOption(value, item, key) {
    const itemCopy = Object.assign({}, item);
    itemCopy[key] = value;
    this.updateItem.emit(itemCopy);
  }
}
