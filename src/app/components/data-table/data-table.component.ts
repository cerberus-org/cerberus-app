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
import { merge, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

import {createMap, getIndex} from "../../functions";
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
      this.subscription = this.data$.subscribe(data => this.data = data);
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
  @Input() showDelete: boolean;
  @Input() isReadOnly: Boolean;
  @Input() getRowColor: (any) => string = () => '';
  @Output() updateItem = new EventEmitter<any>();
  @Output() updateMultipleItems = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();
  @Output() timeSelected = new EventEmitter<any>();
  displayedColumns: string[];
  itemsEdited: any[];
  initialPageSize: number;
  dataSource: DataTableSource;
  mapOfData: Map<string, any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Initializes the data source on changes to data$.
   * @param {SimpleChanges} changes - the changes for data$
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data$']) {
      this.dataSource = new DataTableSource(changes['data$'].currentValue, this.paginator);
      this.mapOfData = createMap(this.dataSource.data);
    }
  }

  /**
   * Sets the initial page size and columns to display.
   */
  ngOnInit(): void {
    this.itemsEdited = [];
    // Determine initial page size using inner height of window at component init
    const surroundingElementsPx = 224;
    const cellPx = 49;
    this.initialPageSize = Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
    this.displayedColumns = this.columnOptions.map(column => column.columnDef);
    if (this.showDelete) {
      this.displayedColumns.push('delete');
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
   * Handles delete button click events by emitting a delete item event.
   * @param item - the item to be deleted
   */
  onClickDelete(item: any): void {
    this.deleteItem.emit(item);
  }

  onSelectTime(value, item, key): void {
    const itemCopy = Object.assign({}, item);
    // If endedAt is null, set to startedAt so we can call setHours on a defined value
    itemCopy.endedAt = item.endedAt ? item.endedAt : item.startedAt;
    itemCopy.endedAt.setHours(value.split(':')[0], value.split(':')[1], 0);
    this.addItemToItems(itemCopy);
  }

  updateItems(items) {
    this.updateMultipleItems.emit(items);
    this.itemsEdited = [];
  }

  /**
   * Remove visit if it matches the item passed in and then add item passed in.
   *
   * @param item
   */
  addItemToItems(item): void {
    const index = getIndex(this.itemsEdited, item.id);
    if (index !== undefined) {
      this.itemsEdited.splice(index, 1);
    }
    this.itemsEdited.push(item);
  }

  /**
   * Display update button if it is the last column option and isReadOnly is false.
   *
   * @param columnHeader
   * @param columnOptions
   * @param isReadOnly
   * @returns {boolean | boolean}
   */
  displayUpdateButton(column, columnOptions, isReadOnly) {
    return column === columnOptions[columnOptions.length - 1]
      && !isReadOnly ? true : false;
  }

  isItemsEdited(itemsEdited): boolean {
    return itemsEdited && itemsEdited.length !== 0 ? true : false;
  }

  /**
   * Handles select option events by emitting the item modified with the selected option.
   * @param value - the value to apply
   * @param item - the table item to modify
   * @param key - the property to modify
   */
  onSelectOption(value, item, key): void {
    const itemCopy = Object.assign({}, item);
    itemCopy[key] = value;
    this.updateItem.emit(itemCopy);
  }
}
