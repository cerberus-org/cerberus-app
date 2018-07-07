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
      validator: (row: VisitWithVolunteer, edits: VisitWithVolunteer): boolean => {
        // return edits.endedAt < row.startedAt; // returns true if error
        return true;
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
