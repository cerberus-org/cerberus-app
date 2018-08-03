import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AppState } from '../../../core/reducers';
import {
  formatDate,
  formatDuration,
  formatTime,
  formatTimeInputValue,
  getFullName,
} from '../../../shared/helpers';
import { ColumnOptions, Site } from '../../../shared/models';
import { VisitWithVolunteer } from '../../../shared/models/visit-with-volunteer';
import * as SettingsActions from '../../actions/settings.actions';
import { VisitDialogComponent } from '../../components/visit-dialog/visit-dialog.component';
import { selectVisitWithVolunteers } from '../../selectors/visits.selectors';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit {

  invalidVisitsEdited: VisitWithVolunteer[];
  validVisitsEdited: VisitWithVolunteer[];
  state$: Observable<VisitWithVolunteer[]>;
  columnOptions: ColumnOptions[];

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
    this.invalidVisitsEdited = [];
    this.validVisitsEdited = [];
  }

  ngOnInit() {
    this.columnOptions = [
      new ColumnOptions(
        'name',
        'Name',
        (row: VisitWithVolunteer) => getFullName(row.volunteer),
      ),
      new ColumnOptions(
        'site',
        'Site',
        (row: VisitWithVolunteer) => row.selectedSite && row.selectedSite.label ? row.selectedSite.label : '--',
      ),
      new ColumnOptions(
        'date',
        'Date',
        (row: VisitWithVolunteer) => formatDate(row.startedAt, row.timezone),
      ),
      new ColumnOptions(
        'startedAt',
        'Start',
        (row: VisitWithVolunteer) => formatTime(row.startedAt, row.timezone),
      ),
      {
        columnDef: 'endedAt',
        header: 'End',
        cell: (row: VisitWithVolunteer) => formatTimeInputValue(row.endedAt, row.timezone),
        isTime: true,
      },
      new ColumnOptions(
        'duration',
        'Duration',
        (row: VisitWithVolunteer) => formatDuration(row.startedAt, row.endedAt, row.timezone),
      ),
    ];
    this.state$ = this.store$.pipe(select(selectVisitWithVolunteers));
  }

  /**
   * Handles the event the 'Save' button is selected.
   *
   * @param {VisitWithVolunteer[]} visits
   */
  onUpdateVisits(visits: VisitWithVolunteer[]) {
    this.store$.dispatch(new SettingsActions.UpdateVisits(visits.filter(visit => delete visit.volunteer)));
  }

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }

  /**
   * Determine font color of cell.
   * If cell is invalid set to red.
   *
   * @param column
   * @param row
   * @returns {string}
   */
  getCellFontColor(visit: VisitWithVolunteer, invalidVisitsEdited: VisitWithVolunteer[]): string {
    return invalidVisitsEdited.filter(item => item.id === visit.id).length ? '#f44336' : '';
  }

  /**
   * Determine font weight of cell.
   * If cell is edited set to bold.
   *
   * @param column
   * @param row
   * @returns {string}
   */
  getCellFontWeight(visit: VisitWithVolunteer, invalidVisitsEdited: VisitWithVolunteer[], validVisitsEdited: VisitWithVolunteer[]): string {
    return (invalidVisitsEdited.filter(item => item.id === visit.id).length ||
      validVisitsEdited.filter(item => item.id === visit.id).length) ? 'bold' : '';
  }

  onEditVisit(visit: VisitWithVolunteer): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Object.assign({}, visit);
    const dialog = this.dialog.open(VisitDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe((visit: VisitWithVolunteer) => {
      if (visit) {

      }
    });
  }
}
