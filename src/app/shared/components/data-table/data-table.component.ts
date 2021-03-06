import { DataSource } from '@angular/cdk/table';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { merge, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
      this.subscription = this.data$.subscribe(data => this.data = data || []);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  connect(): Observable<any[]> {
    return this.data$
      ? merge(this.paginator.page, this.data$)
        .pipe(
          map(() => {
            return this.getPageData();
          }),
        )
      : of([]);
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
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data$: Observable<any[]>;
  @Input() columnOptions: ColumnOptions[];
  @Input() showEdit: boolean;
  @Input() showRemove: boolean;
  @Input() disableEdit: (any) => boolean = () => false;
  @Input() disableRemove: (any) => boolean = () => false;
  @Input() rowColor: (any) => string = () => '';

  @Output() removeRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();

  displayedColumns: string[];
  initialPageSize: number;
  dataSource: DataTableSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Initializes the data source on changes to data$.
   * @param {SimpleChanges} changes - the changes for data$
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data$']) {
      this.dataSource = new DataTableSource(changes['data$'].currentValue, this.paginator);
    }
  }

  /**
   * Sets the initial page size and columns to display.
   */
  ngOnInit(): void {
    // Determine initial page size using inner height of window at component init
    const surroundingElementsPx = 288;
    const cellPx = 49;
    this.initialPageSize = Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
    this.displayedColumns = this.columnOptions.map(column => column.columnDef);
    if (this.showActions) {
      this.displayedColumns.push('actions');
    }
  }

  /**
   * Getter for number of data items in the data source.
   * @returns {number} - the length of the data array in this.dataSource
   */
  get dataLength(): number {
    return !!(this.dataSource && this.dataSource.data) ? this.dataSource.data.length : null;
  }

  get pageSizeByWindowHeight(): number {
    const surroundingElementsPx = 217;
    const cellPx = 49;
    return Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
  }

  /**
   * Handles remove button click events by emitting a remove item event.
   * @param item - the item to be deleted
   */
  onClickRemove(item: any): void {
    this.removeRow.emit(item);
  }

  /**
   * Handles edit button click events by emitting a edit item event.
   * @param item
   */
  onClickEdit(item: any): void {
    this.editRow.emit(item);
  }

  get showActions(): boolean {
    return this.showEdit || this.showRemove;
  }
}
