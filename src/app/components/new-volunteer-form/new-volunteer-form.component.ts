import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as CheckInActions from '../../actions/check-in.actions';
import { State } from '../../reducers/index';
import { Volunteer } from '../../models/volunteer';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.scss']
})
export class NewVolunteerFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) ngForm: FormGroupDirective;
  formGroup: FormGroup;
  forms: { placeholder: string, control: string }[];

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.createForm();
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const volunteer = new Volunteer(
      getLocalStorageObjectProperty('organization', 'id'),
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.petName
    );
    this.store.dispatch(new CheckInActions.SubmitNewVolunteer(volunteer));
    this.ngForm.resetForm();
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
