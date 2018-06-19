import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { formatDate, formatDuration, formatTime } from '../../../functions/index';
import { ColumnOptions, Visit } from '../../../models/index';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {

  @Input() visits$: Observable<Visit[]>;
  visitTableColumnOptions: ColumnOptions[] = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (row: Visit) => formatDate(row.startedAt, row.timezone),
    },
    {
      columnDef: 'startedAt',
      header: 'Start',
      cell: (row: Visit) => formatTime(row.startedAt, row.timezone),
    },
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: Visit) => formatTime(row.endedAt, row.timezone),
    },
    {
      columnDef: 'duration',
      header: 'Duration',
      cell: (row: Visit) => formatDuration(row.startedAt, row.endedAt, row.timezone),
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  /**
   * Passed to data-table as the colorFunc to highlight active visits.
   * @param {Visit} visit
   * @returns {string}
   */
  getVisitRowColor(visit: Visit): string {
    return !visit.endedAt ? '#ccff99' : '';
  }
}
