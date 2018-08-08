import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { ReportsFormComponent } from './components/reports-form/reports-form.component';
import { SiteDialogComponent } from './components/site-dialog/site-dialog.component';
import { VisitDialogComponent } from './components/visit-dialog/visit-dialog.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { RolesComponent } from './containers/roles/roles.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { SiteSettingsComponent } from './containers/site-settings/site-settings.component';
import { TeamSettingsComponent } from './containers/team-settings/team-settings.component';
import { UserSettingsComponent } from './containers/user-settings/user-settings.component';
import { VisitsComponent } from './containers/visits/visits.component';
import { VolunteerSettingsComponent } from './containers/volunteer-settings/volunteer-settings.component';
import { settingsEffects } from './effects';
import { settingsReducers } from './reducers';
import { CsvService } from './services/csv.service';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settingsModule', settingsReducers),
    EffectsModule.forFeature(settingsEffects),
  ],
  declarations: [
    SiteSettingsComponent,
    TeamSettingsComponent,
    RolesComponent,
    ReportsComponent,
    ReportsFormComponent,
    SettingsPageComponent,
    UserSettingsComponent,
    VolunteerSettingsComponent,
    VisitsComponent,
    VisitDialogComponent,
    SiteDialogComponent,
  ],
  exports: [
    SettingsPageComponent,
  ],
  providers: [
    CsvService,
  ],
  entryComponents: [
    SiteDialogComponent, VisitDialogComponent,
  ],
})
export class SettingsModule {}
