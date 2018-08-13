import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { SignatureFieldComponent } from './components/signature-field/signature-field.component';
import { CheckInPageComponent } from './containers/check-in-page/check-in-page.component';
import { TeamDashboardPageComponent } from './containers/team-dashboard-page/team-dashboard-page.component';
import { volunteersEffects } from './effects';
import { VolunteersRoutingModule } from './volunteers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignaturePadModule,
    MaterialModule,
    SharedModule,
    VolunteersRoutingModule,

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature(volunteersEffects),
  ],
  declarations: [
    CheckInPageComponent,
    CheckInFormComponent,
    NewVolunteerFormComponent,
    TeamDashboardPageComponent,
    SignatureFieldComponent,
  ],
})
export class VolunteersModule {}
