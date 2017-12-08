import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as GettingStartedActions from '../../actions/getting-started.actions';
import { State } from '../../reducers/index';
import { User } from '../../models/user';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>) { }

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
      this.store.dispatch(new GettingStartedActions.UpdateValidUser(group.valid
        ? new User(value.firstName, value.lastName, value.email, value.password)
        : null));
    });
  }
}
