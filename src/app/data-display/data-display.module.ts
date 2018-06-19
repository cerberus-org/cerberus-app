import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatPaginatorModule, MatSelectModule, MatTableModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { DailyHoursChartComponent } from './components/daily-hours-chart/daily-hours-chart.component';
import { DataCellComponent } from './components/data-cell/data-cell.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CdkTableModule,
    ChartsModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
  ],
  declarations: [
    DailyHoursChartComponent,
    DataCellComponent,
    DataDisplayComponent,
    DataTableComponent,
  ],
  exports: [
    DataDisplayComponent,
    DataTableComponent,
  ],
})
export class DataDisplayModule {
}
