import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReportsFormComponent } from './components/reports-form/reports-form.component';
import { OrganizationSettingsComponent } from './containers/organization-settings/organization-settings.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { RolesComponent } from './containers/roles/roles.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { VisitsComponent } from './containers/visits/visits.component';
import { VolunteerSettingsComponent } from './containers/volunteer-settings/volunteer-settings.component';
import { CsvService } from './services/csv.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { settingsEffects } from './store/effects';
import { settingsReducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', settingsReducers),
    EffectsModule.forFeature(settingsEffects),
  ],
  declarations: [
    OrganizationSettingsComponent,
    RolesComponent,
    ReportsComponent,
    ReportsFormComponent,
    SettingsPageComponent,
    UserSettingsComponent,
    VolunteerSettingsComponent,
    VisitsComponent,
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
