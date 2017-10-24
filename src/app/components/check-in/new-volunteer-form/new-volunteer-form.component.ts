import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as CheckInActions from '../../../actions/check-in.actions';
import { AppState } from '../../../reducers/index';
import { Volunteer } from '../../../models/volunteer';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.css']
})
export class NewVolunteerFormComponent implements OnInit {
  public error: string;
  public formGroup: FormGroup;
  public forms: { placeholder: string, control: string }[];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.createForm();
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const volunteer = new Volunteer(
      localStorage.getItem('organizationId'),
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.petName
    );
    this.store.dispatch(new CheckInActions.SubmitNewVolunteer(volunteer));

    this.formGroup.reset();
    // Workaround for clearing error state
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].setErrors(null)
    });
  }

  createForm(): void {
    const regex = /^[a-z ,.'-]+$/i;
    const validators = [Validators.required, Validators.pattern(regex), Validators.minLength(2), Validators.maxLength(30)];
    // Defines the FormGroup
    this.formGroup = this.fb.group({
      firstName: ['', validators],
      lastName: ['', validators],
      petName: ['', validators]
    });
    // Allows using *ngFor to add forms
    this.forms = [
      { placeholder: 'First', control: 'firstName' },
      { placeholder: 'Last', control: 'lastName' },
      { placeholder: 'Favorite Pet Name', control: 'petName' }
    ];
  }
}
