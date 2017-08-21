import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VolunteerService } from '../../services/volunteer.service';
import { Volunteer } from '../../models/volunteer';
import { MdSnackBar } from '@angular/material';

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

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar, private volunteerService: VolunteerService) {
    this.changeTab = new EventEmitter<number>();
    this.createForm();
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.capitalize();
    this.volunteerService.createRx(new Volunteer(this.formGroup.value.firstName, this.formGroup.value.lastName,
      this.formGroup.value.petName),
      () => this.snackBar.open('Volunteer successfully signed up!', '', {
        duration: 3000
      }),
      error => this.snackBar.open(error ? `Error checking out: ${error}` : 'Error checking out!', '', {
        duration: 3000
      }));
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
    // Allows using *ngFor to create forms
    this.forms = [
      { placeholder: 'First', control: 'firstName' },
      { placeholder: 'Last', control: 'lastName' },
      { placeholder: 'Favorite Pet Name', control: 'petName' }
    ];
  }

  capitalize(): void {
    Object.keys(this.formGroup.controls).forEach(input => {
      this.formGroup.controls[input].setValue(this.formGroup.controls[input].value.replace(/\b[\w']+\b/g,
        (txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).trim());
    })
  }
}
