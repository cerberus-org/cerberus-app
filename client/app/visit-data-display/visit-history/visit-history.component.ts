import { Component, OnInit, ViewChild } from '@angular/core';
import { Visit } from '../../models/visit';
import * as moment from 'moment-timezone';
import { Store } from '@ngrx/store';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  error: string;
  visits: Visit[];
  visitsByDate: Map<string, Visit[]>;
  dates: string[];
  displayedColumns = ['date', 'startedAt', 'endedAt', 'duration'];
  dataSource: VisitDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.subscribeToVisits();
    this.dataSource = new VisitDataSource(this.store, this.paginator);
  }

  subscribeToVisits(): void {
    this.store.select<Visit[]>('visits').subscribe(
      visits => this.visits = visits,
      error => this.error = <any>error);
  }

  mapVisitsToDate(visits) {
    if (!visits) {
      return;
    }
    const map = new Map<string, Visit[]>();
    visits.forEach(visit => {
      const date = visit.startedAt.toDateString();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date).push(visit);
    });
    this.visitsByDate = map;
    this.dates = Array.from(this.visitsByDate.keys());
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
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class VisitDataSource extends DataSource<any> {
  public error: string;
  public visits;

  constructor(private store: Store<any>, private paginator: MdPaginator) {
    super();
    this.store.select<Visit[]>('visits').subscribe(
      visits => {
        this.visits = visits;
      },
      error => this.error = <any>error);
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.visits,
      this.paginator.page,
    ];
    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.visits.slice();
      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {}
}
