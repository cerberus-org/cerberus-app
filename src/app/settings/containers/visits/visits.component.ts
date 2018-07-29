import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AppState } from '../../../core/reducers';
import {
  formatDate,
  formatDuration,
  formatTime,
  formatTimeInputValue,
  getFullName, getIndex,
  updateDateWithTimeInput,
} from '../../../shared/helpers';
import { ColumnOptions } from '../../../shared/models';
import { VisitWithVolunteer } from '../../../shared/models/visit-with-volunteer';
import * as SettingsActions from '../../actions/settings.actions';
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

  constructor(public store$: Store<AppState>) {
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

  /**
   * Handles the event a visit is edited in the data table.
   *
   * @param {VisitWithVolunteer} visitAndSelectedTime
   */
  onUpdateVisit(visitAndSelectedTime: { time: string, visit: VisitWithVolunteer }): void {
    if (visitAndSelectedTime.time) {
      this.addVisitToEditedList(this.updateVisitEndedAtWithTime(visitAndSelectedTime.time, visitAndSelectedTime.visit));
    }
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

  /**
   * Update visit end date with provided time.
   *
   * @param time
   * @param visit
   * @returns {VisitWithVolunteer}
   */
  updateVisitEndedAtWithTime(time: string, visit: VisitWithVolunteer): VisitWithVolunteer {
    const visitCopy = Object.assign({}, visit);
    // If endedAt is null, set to startedAt so we can call setHours on a defined value
    visitCopy.endedAt = updateDateWithTimeInput(time, visitCopy.endedAt ? visitCopy.endedAt : new Date(visitCopy.startedAt), visit.timezone);
    return visitCopy;
  }

  /**
   * Remove pre-existing visit if it exists and add visit to validItemsedited if valid
   * otherwise add to invalidVisitsEdited.
   *
   * @param {VisitWithVolunteer} visit
   * @param column
   */
  addVisitToEditedList(visit: VisitWithVolunteer): void {
    const itemsEditedIndex = getIndex(this.validVisitsEdited, visit.id);
    const invalidItemsEditedIndex = getIndex(this.invalidVisitsEdited, visit.id);
    if (itemsEditedIndex !== undefined) {
      this.validVisitsEdited.splice(itemsEditedIndex, 1);
    }
    if (invalidItemsEditedIndex !== undefined) {
      this.invalidVisitsEdited.splice(invalidItemsEditedIndex, 1);
    }
    if (this.isVisitValid(visit)) {
      this.validVisitsEdited.push(visit);
    } else {
      this.invalidVisitsEdited.push(visit);
    }
  }

  /**
   * Return true if visit startedAt is before visit endedAt.
   *
   * @param visit
   * @returns {boolean}
   */
  isVisitValid(visit): boolean {
    return new Date(visit.startedAt) < new Date(visit.endedAt);
  }
}
