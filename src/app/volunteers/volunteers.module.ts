import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { SignatureFieldComponent } from './components/signature-field/signature-field.component';
import { CheckInComponent } from './containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';
import { volunteersEffects } from './store/effects';
import { volunteersReducers } from './store/reducers';
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
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('volunteers', volunteersReducers),

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
    CheckInComponent,
    CheckInFormComponent,
    NewVolunteerFormComponent,
    OrganizationDashboardComponent,
    SignatureFieldComponent,
  ],
})
export class VolunteersModule {
}
