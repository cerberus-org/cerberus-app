export interface ColumnOptions {
  columnDef: string;
  header: string;
  cell: Function;
  selectOptions?: Function;
  isTime?: boolean;
}
