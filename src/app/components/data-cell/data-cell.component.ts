import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnOptions } from '../../models/column-options';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-data-cell',
  templateUrl: './data-cell.component.html',
  styleUrls: ['./data-cell.component.scss'],
})
export class DataCellComponent implements OnInit {
  @Input() column: ColumnOptions;
  @Input() row: any;
  @Output() selectOption = new EventEmitter<string>();
  selected: string;
  selectOptions: string[];

  constructor() { }

  ngOnInit() {
    if (this.column.selectOptions) {
      this.selectOptions = this.column.selectOptions(this.row);
    }
    this.selected = this.column.cell(this.row);
  }

  onSelectionChange(selectChange: MatSelectChange): void {
    this.selectOption.emit(selectChange.value);
  }
}
