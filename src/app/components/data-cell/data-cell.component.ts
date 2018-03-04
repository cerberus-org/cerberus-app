import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { ColumnOptions } from '../../models/column-options';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss'],
})
export class DataCellComponent implements OnChanges {
  @Input() column: ColumnOptions;
  @Input() row: any;
  @Output() selectOption = new EventEmitter<string>();
  selected: string;
  selectOptions: string[];

  constructor() { }

  ngOnChanges() {
    if (this.column.selectOptions) {
      this.selectOptions = this.column.selectOptions(this.row);
    }
    this.selected = this.column.cell(this.row);
  }

  onSelectionChange(selectChange: MatSelectChange): void {
    this.selectOption.emit(selectChange.value);
  }
}
