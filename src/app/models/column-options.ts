export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: () => void;

  constructor(columnDef: string, header: string, cell: () => void) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
  }
}

export const testColumnOptions: ColumnOptions[] = [
  {
    label: 'First Name',
    key: 'firstName',
    cell: () => {}
  },
  {
    label: 'Last Name',
    key: 'lastName',
    cell: () => {}
  }
];
