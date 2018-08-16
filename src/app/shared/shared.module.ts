import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material';
import { DailyHoursChartComponent } from './components/daily-hours-chart/daily-hours-chart.component';
import { DataCellComponent } from './components/data-cell/data-cell.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ServicesAgreementDialogComponent } from './components/services-agreement-dialog/services-agreement-dialog.component';
import { ServicesAgreementComponent } from './components/services-agreement/services-agreement.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { TeamSearchComponent } from './containers/team-search/team-search.component';

export const COMPONENTS = [
  DailyHoursChartComponent,
  DataCellComponent,
  DataDisplayComponent,
  DataTableComponent,
  LoaderComponent,
  ProfileFormComponent,
  TeamFormComponent,
  TeamSearchComponent,
  PasswordDialogComponent,
  ServicesAgreementComponent,
  ServicesAgreementDialogComponent,
  UserFormComponent,
];

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [
    PasswordDialogComponent, ServicesAgreementDialogComponent,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class SharedModule {}
