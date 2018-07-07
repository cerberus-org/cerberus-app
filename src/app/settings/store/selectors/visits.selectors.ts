import { createSelector } from '@ngrx/store';
import { formatDate, formatDuration, formatTime, formatTimeInputValue, getFullName } from '../../../functions';
import { ColumnOptions } from '../../../models';
import {
  selectModelVisits,
  selectVisitWithVolunteers,
  VisitWithVolunteer,
} from '../../../root/store/selectors/model.selectors';

export const selectVisitsColumnOptions = createSelector(
  selectModelVisits,
  (): ColumnOptions[] => [
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
      timePicker: true,
      validator: (visit: VisitWithVolunteer): boolean => {
        return new Date(visit.startedAt) < new Date(visit.endedAt); // true if startedAt is earlier
      },
      /**
       * Set time on item date and return.
       *
       * @param {string} time - string e.g. "3:00"
       * @param {Visit} item
       * @returns {{} & VisitWithVolunteer}
       */
      formatTimeInputValueToUpdatedValue: (time: string, visit: VisitWithVolunteer): VisitWithVolunteer => {
        const visitCopy = Object.assign({}, visit);
        // If endedAt is null, set to startedAt so we can call setHours on a defined value
        visitCopy.endedAt = visitCopy.endedAt ? visitCopy.endedAt : new Date(visitCopy.startedAt);
        visitCopy.endedAt.setHours(Number(time.split(':')[0]), Number(time.split(':')[1]), 0);
        return visitCopy;
      },
    },
    new ColumnOptions(
      'duration',
      'Duration',
      (row: VisitWithVolunteer) => formatDuration(row.startedAt, row.endedAt, row.timezone),
    ),
  ],
);

export interface VisitsPageState {
  formattedVisits: any[];
  columnOptions: ColumnOptions[];
}

export const selectVisitsPageState = createSelector(
  selectVisitWithVolunteers,
  selectVisitsColumnOptions,
  (formattedVisits: any[], columnOptions: ColumnOptions[]): VisitsPageState => ({ formattedVisits, columnOptions }),
);
