import { createSelector } from '@ngrx/store';
import {
  formatDate, formatDuration, formatTime, formatTimeInputValue,
  getFullName, updateDateWithTimeInput,
} from '../../../functions';
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
      timePicker: {
        isTime: true,
        updateItemWithTime: (time: string, visit: VisitWithVolunteer): VisitWithVolunteer => {
          const visitCopy = Object.assign({}, visit);
          // If endedAt is null, set to startedAt so we can call setHours on a defined value
          visitCopy.endedAt = updateDateWithTimeInput(time, visitCopy.endedAt ? visitCopy.endedAt : new Date(visitCopy.startedAt));
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
