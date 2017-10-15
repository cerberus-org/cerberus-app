import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SnackBarService } from '../../../services/snack-bar.service';
import { Volunteer } from '../../../models/volunteer';
import { VolunteerService } from '../../../services/volunteer.service';
import * as CheckInActions from '../../../actions/check-in.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.css']
})
export class NewVolunteerFormComponent implements OnInit {
  @Output() changeTab: EventEmitter<number>;
  public error: string;
  public formGroup: FormGroup;
  public forms;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private snackBarService: SnackBarService,
              private volunteerService: VolunteerService) {
    this.changeTab = new EventEmitter<number>();
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
    this.changeTab.emit(0);
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
