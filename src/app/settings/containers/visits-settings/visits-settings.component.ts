import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../../core/reducers';
import { formatDate, formatDuration, formatTime } from '../../../shared/helpers';
import { ColumnOptions, Site } from '../../../shared/models';
import { VisitsTableRow } from '../../models/visits-table-row';
import { getVisitsTableRows } from '../../selectors/visits-settings.selectors';
import { EditVisitDialogComponent } from '../edit-visit-dialog/edit-visit-dialog.component';

@Component({
  selector: 'app-visits-settings',
  templateUrl: './visits-settings.component.html',
  styleUrls: ['./visits-settings.component.scss'],
})
export class VisitsSettingsComponent implements OnInit {

  state$: Observable<VisitsTableRow[]>;
  columnOptions: ColumnOptions[];

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.columnOptions = [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (row: VisitsTableRow) => row.volunteer ? row.volunteer.name : '--',
      },
      {
        columnDef: 'site',
        header: 'Site',
        cell: (row: VisitsTableRow) => row.site ? row.site.name : '--',
      },
      {
        columnDef: 'date',
        header: 'Date',
        cell: (row: VisitsTableRow) => formatDate(row.startedAt, row.timezone),
      },
      {
        columnDef: 'startedAt',
        header: 'Start',
        cell: (row: VisitsTableRow) => formatTime(row.startedAt, row.timezone),
      },
      {
        columnDef: 'endedAt',
        header: 'End',
        cell: (row: VisitsTableRow) => formatTime(row.endedAt, row.timezone),
      },
      {
        columnDef: 'duration',
        header: 'Duration',
        cell: (row: VisitsTableRow) => formatDuration(row.startedAt, row.endedAt, row.timezone),
      },
    ];
    this.state$ = this.store$.pipe(select(getVisitsTableRows));
  }

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }

  /**
   * When the pencil is selected open a dialog with prepopulated data on visit.
   * Subscribe to dialog and get data on close.
   *
   * @param {VisitsTableRow} visit
   */
  onEditVisit(visit: VisitsTableRow): void {
    this.dialog.open(EditVisitDialogComponent, { data: visit });
  }
}
