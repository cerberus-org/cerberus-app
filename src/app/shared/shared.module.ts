import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { DailyHoursChartComponent } from './components/daily-hours-chart/daily-hours-chart.component';
import { DataCellComponent } from './components/data-cell/data-cell.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CdkTableModule,
    ChartsModule,
    CommonModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DailyHoursChartComponent,
    DataCellComponent,
    DataDisplayComponent,
    DataTableComponent,
    OrganizationFormComponent,
    UserFormComponent,
  ],
  exports: [
    DataDisplayComponent,
    DataTableComponent,
    OrganizationFormComponent,
    UserFormComponent,
  ],
})
export class SharedModule {
}
