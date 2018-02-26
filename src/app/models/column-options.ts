export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;

  constructor(columnDef: string, header: string, cell: Function) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
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
