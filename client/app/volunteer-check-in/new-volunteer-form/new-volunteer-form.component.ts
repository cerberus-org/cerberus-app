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

  /**
   *
   * @param word
   * @return A new String with the characters after all hyphens capitalized
   */
  hyphens(word: String): String {
    let letter = 0;
    // for each letter in a word
    for (let i = 0, len = word.length; i < len; i++) {
      if (word.charAt(i) === '-') {
        // get the letter after the hyphen
        letter = i + 1;
        // replace that letter with a capitalized letter
        word = this.setCharAt(word, letter, word.charAt(letter).toUpperCase());
      }
    }
    return word;
  }

  /**
   *
   * @param str
   * @param index
   * @param chr
   * @return A new string with the original character at the supplied index replaced with chr
   */
  setCharAt(str: String, index: number, chr: String): String {
    if (index > str.length - 1) {
      return str;
    }
    return str.substr(0, index) + chr + str.substr(index + 1);
  }
}
