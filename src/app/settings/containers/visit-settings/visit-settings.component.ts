import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { formatDate, formatDuration, formatTime } from '../../../shared/helpers';
import { ColumnOptions, Site } from '../../../shared/models';
import { VisitTableRow } from '../../models/visit-table-row';
import { getVisitTableRows } from '../../selectors/visit-settings.selectors';
import { EditVisitDialogComponent } from '../edit-visit-dialog/edit-visit-dialog.component';

@Component({
  selector: 'app-visits-settings',
  template: `
    <div class="table-container">
      <app-settings-header title="Visits"></app-settings-header>
      <app-data-table
        [data$]="visitTableRows$"
        [columnOptions]="columnOptions"
        [showEdit]="true"
        (editRow)="onEditVisit($event)"
      ></app-data-table>
    </div>
  `,
  styleUrls: ['./visit-settings.component.scss'],
})
export class VisitSettingsComponent {
  visitTableRows$: Observable<VisitTableRow[]>;
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: VisitTableRow) => row.volunteer ? row.volunteer.name : '--',
    },
    {
      columnDef: 'site',
      header: 'Site',
      cell: (row: VisitTableRow) => row.site ? row.site.name : '--',
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (row: VisitTableRow) => formatDate(row.startedAt, row.timezone),
    },
    {
      columnDef: 'startedAt',
      header: 'Start',
      cell: (row: VisitTableRow) => formatTime(row.startedAt, row.timezone),
    },
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: VisitTableRow) => formatTime(row.endedAt, row.timezone),
    },
    {
      columnDef: 'duration',
      header: 'Duration',
      cell: (row: VisitTableRow) => formatDuration(row.startedAt, row.endedAt, row.timezone),
    },
  ];

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
    this.visitTableRows$ = store$.pipe(select(getVisitTableRows));
  }

  /**
   * When the pencil is selected open a dialog with prepopulated data on visit.
   * Subscribe to dialog and get data on close.
   *
   * @param {VisitTableRow} visit
   */
  onEditVisit(visit: VisitTableRow): void {
    this.dialog.open(EditVisitDialogComponent, { data: visit });
  }
}
