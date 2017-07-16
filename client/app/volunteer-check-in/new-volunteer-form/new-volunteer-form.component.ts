import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VolunteerService } from '../../shared/volunteer.service';
import { Observable } from 'rxjs/Observable';

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

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) {
    this.changeTab = new EventEmitter<number>();
    this.createForm();
  }

  ngOnInit(): void { }

  onSubmit(): void {
<<<<<<< HEAD
    this.volunteerService.create(this.formGroup.value)
=======
    // this.capitalize();
    console.log(this.formGroup.value);
    this.volunteerService.postVolunteer(this.formGroup.value)
>>>>>>> Use text transform for capitalization of css
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
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
    let control = '';
    let words: Array<String>;
    let index: number;
    // for each form control
    Object.keys(this.formGroup.controls).forEach(key => {
      words = this.formGroup.controls[key].value.split(' ');
        // for each word in a control
        words.forEach(word => {
          // if there is a -
          if (word.indexOf('-') !== null) {
            index = word.indexOf('-');
            word.charAt(index--).toUpperCase();
            index += 2;
            word.charAt(index).toUpperCase();
          }
          // capitalize
          control += word.charAt(0).toUpperCase() + word.slice(1)
          // if it isnt the first word or the last word add a space
          if (control !== ' ' && control.split(' ').length !== words.length) {
            control += ' ';
          }
        })
        // update control
        this.formGroup.controls[key].setValue(control);
        // clear variable for next control
        control = '';
    });
  }
}
