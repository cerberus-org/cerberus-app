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
    this.capitalize();
    console.log(this.formGroup.value);
    // this.volunteerService.create(this.formGroup.value)
    //   .subscribe(
    //     res => console.log(res),
    //     error => this.error = <any>error);
    // this.formGroup.reset();
    // // Workaround for clearing error state
    // Object.keys(this.formGroup.controls).forEach(key => {
    //   this.formGroup.controls[key].setErrors(null)
    // });
    // this.changeTab.emit(0);
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
    // for each form control
    Object.keys(this.formGroup.controls).forEach(key => {
      words = this.formGroup.controls[key].value.split(' ');
        // for each word in a control
        words.forEach(word => {
          // if there is a -
          if (word.indexOf('-') !== null) {
            // capitalize all characters after a -
            word = this.hyphens(word);
          }
          // capitalize first letter of every word
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

  /*
  @requires a String
  @ensures all the first letter after a hyphen is capitalized
   */
  hyphens(word: String): String {
    let newWord = '';
    let index = 0;
    // index to capitalize
    let letter: number;
    // for each letter in a word
    for (let i = 0, len = word.length; i < len; i++) {
      if (word.charAt(i) === '-') {
        letter = i + 1;
        // concat last index that wasnt added to index that was capitalized
        newWord += word.slice(index, i += 1).concat(word.charAt(letter).toUpperCase());
        index = letter += 1
      }
    }
    // if all necessary letters were capitialzied, concat the rest of the string
    newWord = newWord.slice(0, index) + word.slice(index);
    return newWord;
  }
}
