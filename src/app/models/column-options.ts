export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: string[];

  constructor(columnDef: string, header: string, cell: Function, selectOptions?: string[]) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
    this.selectOptions = selectOptions;
  }
}

export const testColumnOptions: ColumnOptions[] = [
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
