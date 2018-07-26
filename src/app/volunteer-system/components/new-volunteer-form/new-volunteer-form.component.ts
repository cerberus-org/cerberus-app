import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Volunteer } from '../../../shared/models';
import { ServicesAgreementDialogComponent } from '../../../shared/components/services-agreement-dialog/services-agreement-dialog.component';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.scss'],
})
export class NewVolunteerFormComponent {
  @Output() newVolunteer = new EventEmitter<Volunteer>();
  @ViewChild(FormGroupDirective) ngForm: FormGroupDirective;
  formGroup: FormGroup;
  forms: { placeholder: string, control: string }[];
  isPolicyChecked: Boolean;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
  }

  submit(): void {
    const volunteer = new Volunteer(
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.petName,
    );
    this.ngForm.resetForm();
    this.newVolunteer.emit(volunteer);
  }

  createForm(): void {
    const regex = /^[a-z ,.'-]+$/i;
    const validators = [Validators.required, Validators.pattern(regex), Validators.minLength(2), Validators.maxLength(30)];
    // Defines the FormGroup
    this.formGroup = this.fb.group({
      firstName: ['', validators],
      lastName: ['', validators],
      petName: ['', validators],
    });
    // Allows using *ngFor to add forms
    this.forms = [
      { placeholder: 'First', control: 'firstName' },
      { placeholder: 'Last', control: 'lastName' },
      { placeholder: 'Favorite Pet Name', control: 'petName' },
    ];
  }

  setPolicyCheckBox(e): void {
    this.isPolicyChecked = e.checked;
  }

  openServicesAgreementDialog(): void {
    this.dialog.open(ServicesAgreementDialogComponent);
  }
}
