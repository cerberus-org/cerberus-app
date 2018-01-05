import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() passwordRequired;
  @Input() title: string;
  // Initial user used to pre populate form
  @Input() initialUser: User;
  // User entered in form
  @Output() validUser = new EventEmitter();
  formGroup: FormGroup;
  formSubscription: Subscription;
  hidePwd: boolean;
  hideConfirmPwd: boolean;

  constructor(private fb: FormBuilder) {
    this.hidePwd = true;
    this.hideConfirmPwd = true;
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

  createForm(): FormGroup {
    return this.fb.group({
      // If initialUser was passed in, pre populate form, else leave blank
      firstName: [this.initialUser ? this.initialUser.firstName : '', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      lastName: [this.initialUser ? this.initialUser.lastName : '', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      email: [this.initialUser ? this.initialUser.email : '', [Validators.maxLength(255), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128), this.passwordRequiredValidator]],
      confirmPassword: ['']
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

  /**
   * Make password requirement conditional on passwordRequired.
   * @param {AbstractControl} control
   * @returns {{[p: string]: any}}
   */
  passwordRequiredValidator = (control: AbstractControl): { [key: string]: any } => {
    if (this.passwordRequired && !control.value) {
      return { error: 'required'};
    }
  };

  /**
   * Set confirmPassword control errors and form invalid if password and confirmPassword do not match.
   * @param {string} passwordKey
   * @param {string} confirmPasswordKey
   * @returns {(group: FormGroup) => {[p: string]: any}}
   */
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatchedPasswords: true });
        return { mismatchedPasswords: true };
      }
      confirmPassword.setErrors(null);
    }
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
