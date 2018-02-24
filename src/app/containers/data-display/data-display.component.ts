import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Subscription } from 'rxjs/Subscription';
import { formatDate, formatDuration, formatTime } from '../../functions/date-format';
import { ColumnOptions } from '../../models/column-options';
import { Visit } from '../../models/visit';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss']
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  appSubscription: Subscription;
  visits$: Observable<Visit[]>;
  visitTableColumnOptions: ColumnOptions[] = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (row: Visit) => formatDate(row.startedAt, row.timezone)
    },
    {
      columnDef: 'startedAt',
      header: 'Start',
      cell: (row: Visit) => formatTime(row.startedAt, row.timezone)
    },
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: Visit) => formatTime(row.endedAt, row.timezone)
    },
    {
      columnDef: 'duration',
      header: 'Duration',
      cell: (row: Visit) => formatDuration(row.startedAt, row.endedAt, row.timezone)
    }
  ];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.visits$ = this.store.select('model')
      .map(state => state.visits);
  }

  ngOnDestroy(): void {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
  }
}
