export class ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: Function;
  isTime?: boolean;

  constructor(columnDef: string, header: string, cell: Function, selectOptions: Function = null, isTime: boolean = false) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
    this.selectOptions = selectOptions;
    this.isTime = isTime;
  }
}
