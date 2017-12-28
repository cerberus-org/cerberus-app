import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { getLocalStorageObject } from '../../functions/localStorageObject';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Output() validUser = new EventEmitter();
  formGroup: FormGroup;
  formSubscription: Subscription;
  hidePwd: boolean;

  constructor(private fb: FormBuilder) {
    this.hidePwd = true;
  }

  ngOnInit(): void {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
    // Emit User if form is valid after creation
    this.emitUserIfValid();
  }

  emitUserIfValid(): void {
    const value = this.formGroup.value;
    if (this.formGroup.valid) {
      this.validUser.emit(new User(value.firstName, value.lastName, value.email, value.password))
    } else {
      this.validUser.emit(null);
    }
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    const user = getLocalStorageObject('user');
    return this.fb.group({
      // If the user is logged in, pre populate form, else leave blank
      firstName: [user ? user.firstName : '', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      lastName: [user ? user.lastName : '', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      email: [user ? user.email : '', [Validators.maxLength(255), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128), Validators.required]]
    });
  }

  /**
   * Subscribes to the form group and emit a new User object if User is valid.
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      this.emitUserIfValid();
    });
  }
}
