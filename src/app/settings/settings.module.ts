import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSlideToggleModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportsFormComponent } from './components/reports-form/reports-form.component';
import { OrganizationSettingsComponent } from './containers/organization-settings/organization-settings.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { RolesComponent } from './containers/roles/roles.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { VolunteerSettingsComponent } from './containers/volunteer-settings/volunteer-settings.component';
import { CsvService } from './services/csv.service';
import { settingsRoutes } from './settings.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    RouterModule.forChild(settingsRoutes),
    // Cerberus Modules
    SharedModule,
  ],
  declarations: [
    OrganizationSettingsComponent,
    RolesComponent,
    ReportsComponent,
    ReportsFormComponent,
    SettingsPageComponent,
    UserSettingsComponent,
    VolunteerSettingsComponent,
  ],
  exports: [
    SettingsPageComponent,
  ],
  providers: [
    CsvService,
  ],
})
export class SettingsModule {
}
