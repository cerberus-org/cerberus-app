import * as _ from 'lodash';
import { ColumnOptions } from '../../app/shared/models';

export const mockColumnOptions: ColumnOptions[] = [
  {
    columnDef: 'firstName',
    header: 'First Name',
    cell: () => {},
  },
  {
    columnDef: 'lastName',
    header: 'Last Name',
    cell: () => {},
  },
];

export const createMockColumnOptions = (columnOptions: ColumnOptions[] = mockColumnOptions): ColumnOptions[] =>
  _.cloneDeep(columnOptions);
