import { createSelector } from '@ngrx/store';
import { formatDate, formatTime } from '../../../functions';
import { ColumnOptions } from '../../../models';
import { selectFormattedModelVisits, selectModelVisits } from '../../../root/store/selectors/model.selectors';

export const selectVisitsColumnOptions = createSelector(
  selectModelVisits,
  (): ColumnOptions[] => [
    new ColumnOptions(
      'name',
      'Name',
      (row: any) => row.name,
    ),
    new ColumnOptions(
      'date',
      'Date',
      (row: any) => formatDate(row.startedAt, row.timezone),
    ),
    new ColumnOptions(
      'startedAt',
      'Start',
      (row: any) => formatTime(row.startedAt, row.timezone),
    ),
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: any) => row.endedAt,
      timePicker: true,
    },
    new ColumnOptions(
      'duration',
      'Duration',
      (row: any) => row.duration,
    ),
  ],
);

export interface VisitsPageState {
  formattedVisits: any[];
  columnOptions: ColumnOptions[];
}

export const selectVisitsPageState = createSelector(
  selectFormattedModelVisits,
  selectVisitsColumnOptions,
  (formattedVisits: any[], columnOptions: ColumnOptions[]): VisitsPageState => ({ formattedVisits, columnOptions }),
);
