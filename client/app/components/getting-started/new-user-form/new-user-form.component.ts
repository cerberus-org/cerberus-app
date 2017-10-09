import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../models/user';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.createForm();
    this.subscribeToForm(this.formGroup);
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      email: ['', [Validators.maxLength(255), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128), Validators.required]]
    });
  }

  subscribeToForm(group: FormGroup): void {
    group.valueChanges.subscribe(changes => {
      const value = this.formGroup.value;
      this.user.emit(group.valid
        ? new User(value.firstName, value.lastName, value.email, value.password)
        : null);
    });
  }
}
