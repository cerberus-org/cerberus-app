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
import { MemberSettingsComponent } from './containers/member-settings/member-settings.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { SiteDialogComponent } from './containers/site-dialog/site-dialog.component';
import { SiteSettingsComponent } from './containers/site-settings/site-settings.component';
import { TeamSettingsComponent } from './containers/team-settings/team-settings.component';
import { VisitSettingsComponent } from './containers/visit-settings/visit-settings.component';
import { VolunteerSettingsComponent } from './containers/volunteer-settings/volunteer-settings.component';
import { settingsEffects } from './effects';
import { settingsReducers } from './reducers';
import { CsvService } from './services/csv.service';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHeaderComponent } from './components/settings-header/settings-header.component';

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
    MemberSettingsComponent,
    ReportsComponent,
    ReportsFormComponent,
    SettingsPageComponent,
    SiteDialogComponent,
    SiteSettingsComponent,
    TeamSettingsComponent,
    VisitSettingsComponent,
    VolunteerSettingsComponent,
    SettingsHeaderComponent,
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
