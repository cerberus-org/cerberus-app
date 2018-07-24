import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';
import {
  formatDate, formatDuration, formatTime, formatTimeInputValue, getFullName,
  updateDateWithTimeInput,
} from '../../../functions';
import { ColumnOptions, Visit } from '../../../models';
import { VisitWithVolunteer } from '../../../models/visit-with-volunteer';
import { RootState } from '../../../root/store/reducers';
import * as SettingsActions from '../../store/actions/settings.actions';
import { selectVisitWithVolunteers } from '../../store/selectors/visits.selectors';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss'],
})
export class VisitsComponent implements OnInit {

  state$: Observable<VisitWithVolunteer[]>;
  columnOptions: ColumnOptions[];

  constructor(public store$: Store<RootState>) { }

  ngOnInit() {
    this.columnOptions = [
      new ColumnOptions(
        'name',
        'Name',
        (row: VisitWithVolunteer) => getFullName(row.volunteer),
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
        timePicker: {
          isTime: true,
          updateItemWithTime: (time: string, visit: VisitWithVolunteer): VisitWithVolunteer => {
            const visitCopy = Object.assign({}, visit);
            // If endedAt is null, set to startedAt so we can call setHours on a defined value
            visitCopy.endedAt = updateDateWithTimeInput(time, visitCopy.endedAt ? visitCopy.endedAt : new Date(visitCopy.startedAt), visit.timezone);
            return visitCopy;
          },
        },
        validator: (visit: VisitWithVolunteer): boolean => {
          // return true if startedAt is earlier
          return new Date(visit.startedAt) < new Date(visit.endedAt);
        },
      },
      new ColumnOptions(
        'duration',
        'Duration',
        (row: VisitWithVolunteer) => formatDuration(row.startedAt, row.endedAt, row.timezone),
      ),
    ];
    this.state$ = this.store$.pipe(select(selectVisitWithVolunteers));
  }

  onUpdateVisits(visits: VisitWithVolunteer[]) {
    this.store$.dispatch(new SettingsActions.UpdateVisits(visits.filter(visit => delete visit.volunteer)));
  }

  get visitsWithVolunteers$() {
    return this.state$.pipe(map(state => state));
  }
}
