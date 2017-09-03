import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../models/user';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  @Output() valid = new EventEmitter<boolean>();
  @Output() user = new EventEmitter<User>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.createForm();
    this.subscribeToForm(this.formGroup);
  }

  onSubmit() {
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  subscribeToForm(group: FormGroup): void {
    group.valueChanges.subscribe(changes => {
      this.valid.emit(group.valid);
      if (group.valid) {
        const value = this.formGroup.value;
        this.user.emit(new User(value.firstName, value.lastName, value.email));
      }
    });
  }
}
