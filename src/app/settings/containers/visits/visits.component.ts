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
import { VisitDialogComponent } from '../../components/visit-dialog/visit-dialog.component';
import { selectVisitWithVolunteers } from '../../selectors/visits.selectors';
import * as SettingsActions from "../../actions/settings.actions";

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

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }

  updateVisit(visit: VisitWithVolunteer) {
    delete visit.volunteer;
    delete visit.organizationSites;
    visit.siteId = visit.selectedSite.id;
    delete visit.selectedSite;
    this.store$.dispatch(new SettingsActions.UpdateVisit(visit));
  }

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
