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
import { SignaturePadModule } from 'angular2-signaturepad';

import { SharedModule } from '../shared/shared.module';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { SignatureFieldComponent } from './components/signature-field/signature-field.component';
import { CheckInComponent } from './containers/check-in/check-in.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
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
    SharedModule,
  ],
  declarations: [
    CheckInComponent,
    CheckInFormComponent,
    NewVolunteerFormComponent,
    OrganizationDashboardComponent,
    SignatureFieldComponent,
  ],
  exports: [
    OrganizationDashboardComponent,
  ],
})
export class CheckInModule {
}
