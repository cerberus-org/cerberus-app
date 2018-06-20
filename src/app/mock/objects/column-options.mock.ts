import { ColumnOptions } from '../../models';

export const mockColumnOptions: ColumnOptions[] = [
  {
    columnDef: 'firstName',
    header: 'First Name',
    cell: () => {},
    selectOptions: () => ['Test Option 1', 'Test Option 2'],
  },
  {
    columnDef: 'lastName',
    header: 'Last Name',
    cell: () => {},
  },
];
