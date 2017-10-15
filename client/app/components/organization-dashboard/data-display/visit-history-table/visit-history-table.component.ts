import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge'
import * as moment from 'moment-timezone';

import { Visit } from '../../../../models/visit';
import { State } from '../../../../reducers/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-visit-history-table',
  templateUrl: './visit-history-table.component.html',
  styleUrls: ['./visit-history-table.component.css']
})
export class VisitHistoryTableComponent implements OnInit {
  initialPageSize: number;
  displayedColumns = ['date', 'startedAt', 'endedAt', 'duration'];
  dataSource: VisitDataSource | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    // Determine initial page size using inner height of window at component init
    const surroundingElementsPx = 281;
    const cellPx = 49;
    this.initialPageSize = Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
    this.dataSource = new VisitDataSource(this.store.select('dataDisplay'), this.paginator);
  }

  formatDate(date: Date, timezone: string): string {
    return moment(date).tz(timezone).calendar(null, {
      lastDay: '[Yesterday], MMMM D',
      sameDay: '[Today], MMMM D',
      nextDay: '[Tomorrow], MMMM D',
      lastWeek: '[Last] dddd, MMMM D',
      nextWeek: '[Next] dddd, MMMM D',
      sameElse: 'dddd, MMMM D'
    });
  }

  formatTime(date: Date, timezone: string): string {
    return date ? moment(date).tz(timezone).format('h:mm a') : 'Active!';
  }

  formatDuration(visit: Visit): string {
    return !visit.endedAt
      ? moment(visit.startedAt).tz(visit.timezone).toNow(true)
      : moment(visit.startedAt).tz(visit.timezone).to(visit.endedAt, true);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source can retrieve its data in
 * any way. It is not the data source's responsibility to manage the underlying data. Instead, it only needs to take the
 * data and send the table exactly what should be rendered.
 */
export class VisitDataSource extends DataSource<any> implements OnDestroy {
  visitsSubscription: Subscription;
  visits: Visit[];
  error: string;

  constructor(private visits$: Observable<State['dataDisplay']>, private paginator: MatPaginator) {
    super();
    this.visitsSubscription = this.visits$
      .subscribe(state => this.visits = state.visits);
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  connect(): Observable<any[]> {
    return Observable.merge(this.paginator.page, this.visits$).map(() => {
      return this.getPageData();
    });
  }

  getPageData(): Visit[] {
    const data = this.visits.slice();
    // Grab the page's slice of data based on the current page and items per page.
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  disconnect() {}
}
