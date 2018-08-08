import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../../core/reducers';
import { formatDate, formatDuration, formatTime } from '../../../shared/helpers';
import { ColumnOptions, Site } from '../../../shared/models';
import { VisitWithData } from '../../models/visit-with-data';
import { selectVisitsWithAllData } from '../../selectors/visits.selectors';
import { EditVisitDialogComponent } from '../edit-visit-dialog/edit-visit-dialog.component';

@Component({
  selector: 'app-visits',
  templateUrl: './visit-settings.component.html',
  styleUrls: ['./visit-settings.component.scss'],
})
export class VisitSettingsComponent implements OnInit {

  state$: Observable<VisitWithData[]>;
  columnOptions: ColumnOptions[];

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.columnOptions = [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (row: VisitWithData) => row.volunteer ? row.volunteer.name : '--',
      },
      {
        columnDef: 'site',
        header: 'Site',
        cell: (row: VisitWithData) => row.site ? row.site.name : '--',
      },
      {
        columnDef: 'date',
        header: 'Date',
        cell: (row: VisitWithData) => formatDate(row.startedAt, row.timezone),
      },
      {
        columnDef: 'startedAt',
        header: 'Start',
        cell: (row: VisitWithData) => formatTime(row.startedAt, row.timezone),
      },
      {
        columnDef: 'endedAt',
        header: 'End',
        cell: (row: VisitWithData) => formatTime(row.endedAt, row.timezone),
      },
      {
        columnDef: 'duration',
        header: 'Duration',
        cell: (row: VisitWithData) => formatDuration(row.startedAt, row.endedAt, row.timezone),
      },
    ];
    this.state$ = this.store$.pipe(select(selectVisitsWithAllData));
  }

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }

  /**
   * When the pencil is selected open a dialog with prepopulated data on visit.
   * Subscribe to dialog and get data on close.
   *
   * @param {VisitWithData} visit
   */
  onEditVisit(visit: VisitWithData): void {
    this.dialog.open(EditVisitDialogComponent, { data: visit });
  }
}
