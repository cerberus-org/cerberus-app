import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment-timezone';
import 'rxjs/add/observable/merge'

import { Visit } from '../../../../models/visit';
import { State } from '../../../../reducers/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-visit-history-table',
  templateUrl: './visit-history-table.component.html',
  styleUrls: ['./visit-history-table.component.css']
})
export class VisitHistoryTableComponent implements OnInit {
  @Input() visits$: Observable<State['visits']>;
  initialPageSize: number;
  displayedColumns = ['date', 'startedAt', 'endedAt', 'duration'];
  dataSource: VisitDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor() { }

  ngOnInit() {
    // Determine initial page size using inner height of window at component init
    const surroundingElementsPx = 281;
    const cellPx = 49;
    this.initialPageSize = Math.floor((window.innerHeight - surroundingElementsPx) / cellPx);
    this.dataSource = new VisitDataSource(this.visits$, this.paginator);
  }

  formatTime(date: Date, timezone: string): string {
    return date ? moment(date.getTime()).tz(timezone).format('h:mm a') : '-';
  }

  formatDuration(visit: Visit): string {
    if (!visit.endedAt) {
      return '-';
    }
    const duration = visit.endedAt.getTime() - visit.startedAt.getTime();
    // Convert to seconds
    let seconds = duration / 1000;
    // Extract hours
    const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // Extract minutes
    const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    return `${hours} hours, ${minutes} minutes`;
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

  constructor(private visits$: Observable<State['visits']>, private paginator: MdPaginator) {
    super();
    this.visitsSubscription = this.subscribeToVisits();
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
  }

  subscribeToVisits(): Subscription {
    return this.visits$.subscribe(
      state => this.visits = state.visits,
      error => this.error = <any>error);
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
