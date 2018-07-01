import { createSelector } from '@ngrx/store';
import { formatDate } from '../../../functions';
import { ColumnOptions } from '../../../models';
import { selectFormattedModelVisits } from '../../../root/store/selectors/model.selectors';

export const selectVisitsColumnOptions = createSelector(
  (): ColumnOptions[] => [
    new ColumnOptions(
      'name',
      'Name',
      (row: any) => row.name,
    ),
    new ColumnOptions(
      'duration',
      'Duration',
      (row: any) => row.duration,
    ),
    new ColumnOptions(
      'startedAt',
      'Start',
      (row: any) => formatDate(row.startedAt, row.timezone),
    ),
    {
      columnDef: 'endedAt',
      header: 'End',
      cell: (row: any) => row.endedAt,
      timePicker: true,
    },
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
