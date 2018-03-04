export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: Function;

  constructor(columnDef: string, header: string, cell: Function, selectOptions?: Function) {
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
