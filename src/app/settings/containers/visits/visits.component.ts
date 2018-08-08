import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AppState } from '../../../core/reducers';
import { formatDate, formatTime, formatTimeInputValue } from '../../../shared/helpers';
import { ColumnOptions, Site } from '../../../shared/models';
import { UpdateVisit } from '../../actions/settings.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { VisitDialogComponent } from '../../components/visit-dialog/visit-dialog.component';
import { VisitWithVolunteer } from '../../models/visit-with-volunteer';
import { selectVisitWithVolunteers } from '../../selectors/visits.selectors';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit {

  state$: Observable<VisitWithVolunteer[]>;
  columnOptions: ColumnOptions[];

  constructor(public store$: Store<AppState>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.columnOptions = [
      {
        columnDef: 'name',
        header: 'Name',
        cell: (row: VisitWithVolunteer) => row.volunteer.name,
      },
      {
        columnDef: 'site',
        header: 'Site',
        cell: (row: VisitWithVolunteer) => row.selectedSite && row.selectedSite.name ? row.selectedSite.name : '--',
      },
      {
        columnDef: 'date',
        header: 'Date',
        cell: (row: VisitWithVolunteer) => formatDate(row.startedAt, row.timezone),
      },
      {
        columnDef: 'startedAt',
        header: 'Start',
        cell: (row: VisitWithVolunteer) => formatTime(row.startedAt, row.timezone),
      },
      {
        columnDef: 'endedAt',
        header: 'End',
        cell: (row: VisitWithVolunteer) => formatTimeInputValue(row.endedAt, row.timezone),
        isTime: true,
      },
      {
        columnDef: 'duration',
        header: 'Duration',
        cell: (row: VisitWithVolunteer) => formatTimeInputValue(row.endedAt, row.timezone),
      },
    ];
    this.state$ = this.store$.pipe(select(selectVisitWithVolunteers));
  }

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }

  /**
   * Remove volunteer, teamSites and selectedSite to change visit from type
   * VisitWithVolunteer to type Visit and then update visit.
   *
   * @param {VisitWithVolunteer} visit
   */
  updateVisit(visit: VisitWithVolunteer) {
    delete visit.volunteer;
    delete visit.teamSites;
    visit.siteId = visit.selectedSite.id;
    delete visit.selectedSite;
    this.store$.dispatch(new UpdateVisit(visit));
  }

  /**
   * When the pencil is selected open a dialog with prepopulated data on visit.
   * Subscribe to dialog and get data on close.
   *
   * @param {VisitWithVolunteer} visit
   */
  onEditVisit(visit: VisitWithVolunteer): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = Object.assign({}, visit);
    const dialog = this.dialog.open(VisitDialogComponent, dialogConfig);
    dialog.afterClosed().subscribe((visit: VisitWithVolunteer) => {
      if (visit) {
        this.updateVisit(visit);
      }
    });
  }
}
