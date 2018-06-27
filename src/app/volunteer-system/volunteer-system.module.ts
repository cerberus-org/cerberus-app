import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatStepperModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SharedModule } from '../shared/shared.module';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { SignatureFieldComponent } from './components/signature-field/signature-field.component';
import { CheckInComponent } from './containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';
import { volunteerSystemEffects } from './store/effects';
import { volunteerSystemReducers } from './store/reducers';
import { volunteerSystemRoutes } from './volunteer-system.routes';

@NgModule({
  declarations: [
    CheckInComponent,
    CheckInFormComponent,
    NewVolunteerFormComponent,
    OrganizationDashboardComponent,
    SignatureFieldComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(volunteerSystemRoutes),
    StoreModule.forFeature('checkIn', volunteerSystemReducers),
    EffectsModule.forFeature(volunteerSystemEffects),
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule,
    ReactiveFormsModule,
    SignaturePadModule,
    // Cerberus modules
    SharedModule,
  ],
  exports: [
    OrganizationDashboardComponent,
    RouterModule,
  ],
})
export class VolunteerSystemModule {
}
