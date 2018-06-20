export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: Function;
  timePicker?: Boolean;

  constructor(columnDef: string, header: string, cell: Function, selectOptions: Function = null, timePicker: Boolean = false) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
    this.selectOptions = selectOptions;
    this.timePicker = timePicker;
  }
}

export const testColumnOptions: ColumnOptions[] = [
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
