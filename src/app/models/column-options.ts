export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: Function;
  timePicker?: TimePicker;
  validator?: Function;

  constructor(columnDef: string, header: string, cell: Function, selectOptions: Function = null, timePicker: TimePicker = null) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
    this.selectOptions = selectOptions;
    this.timePicker = timePicker;
  }
}

export class TimePicker {
  isTime: boolean;
  updateItemWithTime?: Function;
}
