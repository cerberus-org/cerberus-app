import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { ReportsFormComponent } from './components/reports-form/reports-form.component';
import { EditMemberDialogComponent } from './containers/edit-member-dialog/edit-member-dialog.component';
import { EditVisitDialogComponent } from './containers/edit-visit-dialog/edit-visit-dialog.component';
import { MembersSettingsComponent } from './containers/members-settings/members-settings.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { SiteDialogComponent } from './containers/site-dialog/site-dialog.component';
import { SitesSettingsComponent } from './containers/sites-settings/sites-settings.component';
import { TeamSettingsComponent } from './containers/team-settings/team-settings.component';
import { VisitsSettingsComponent } from './containers/visits-settings/visits-settings.component';
import { VolunteersSettingsComponent } from './containers/volunteers-settings/volunteers-settings.component';
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
    EditMemberDialogComponent,
    EditVisitDialogComponent,
    MembersSettingsComponent,
    ReportsComponent,
    ReportsFormComponent,
    SettingsPageComponent,
    SiteDialogComponent,
    SitesSettingsComponent,
    TeamSettingsComponent,
    VisitsSettingsComponent,
    VolunteersSettingsComponent,
  ],
  exports: [
    SettingsPageComponent,
  ],
  providers: [
    CsvService,
  ],
  entryComponents: [
    EditMemberDialogComponent,
    EditVisitDialogComponent,
    SiteDialogComponent,
  ],
})
export class SettingsModule {}
