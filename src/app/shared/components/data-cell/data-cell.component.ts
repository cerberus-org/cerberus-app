import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColumnOptions } from '../../models';

@Component({
  selector: 'app-data-cell',
  template: `
    <div>{{cellValue}}</div>
  `,
  styleUrls: ['./data-cell.component.scss'],
})
export class DataCellComponent {
  @Input() column: ColumnOptions;
  @Input() row: any;
  @Output() selectOption = new EventEmitter<string>();
  selected: string;
  selectOptions: string[];

  get cellValue() {
    return this.column.cell(this.row);
  }
}
