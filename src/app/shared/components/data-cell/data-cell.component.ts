import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { convertToTimeString } from '../../../functions';
import { ColumnOptions } from '../../../models';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss'],
})
export class DataCellComponent implements OnChanges {
  @Input() column: ColumnOptions;
  @Input() row: any;
  @Output() selectOption = new EventEmitter<string>();
  @Output() selectedTime = new EventEmitter<string>();
  selected: string;
  selectOptions: string[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const columnChanges = changes['column'];
    if (columnChanges && columnChanges.currentValue.selectOptions) {
      this.selectOptions = columnChanges.currentValue.selectOptions(this.row);
      this.selected = columnChanges.currentValue.cell(this.row);
    }
  }

  onSelectionChange(value: string): void {
    this.selectOption.emit(value);
  }

  get inputType(): string {
    if (this.selectOptions && this.selectOptions.length) {
      return 'SELECT';
    }
    if (this.column.timePicker) {
      return 'TIME_PICKER';
    }
    return 'TEXT_ONLY';
  }

  onTimeChange(val: any, date: string): void {
    if (val && val.target && val.target.value && val.target.value !== this.getTime(date)) {
      this.selectedTime.emit(val.target.value);
    }
  }

  getTime(date: string): String {
    return convertToTimeString(date);
  }
}
