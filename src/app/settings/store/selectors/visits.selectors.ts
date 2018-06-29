import { createSelector } from '@ngrx/store';
import { selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { formatDate } from '../../../functions';
import { ColumnOptions, User, Visit } from '../../../models';
import { selectModelVisits } from '../../../root/store/selectors/model.selectors';

export const selectVisitsColumnOptions = createSelector(
  selectSessionUser,
  selectModelVisits,
  (sessionUser: User, modelVisits: Visit[]): ColumnOptions[] => [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: Visit) => row.id,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: Visit) => row.id,
    ),
    new ColumnOptions(
      'startedAt',
      'Start',
      (row: Visit) => formatDate(row.startedAt, row.timezone),
    ),
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: Visit) => row.endedAt,
      timePicker: true,
    },
  ],
);

export interface VisitsPageState {
  visits: Visit[];
  columnOptions: ColumnOptions[];
}

export const selectVisitsPageState = createSelector(
  selectModelVisits,
  selectVisitsColumnOptions,
  (visits: Visit[], columnOptions: ColumnOptions[]): VisitsPageState => ({ visits, columnOptions }),
);
