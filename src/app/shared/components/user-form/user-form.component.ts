import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member } from '../../models';
import { Credentials } from '../../models/credentials';

export interface UserFormChanges {
  member: Member;
  credentials: Credentials;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() passwordRequired;
  @Input() title: string;
  // Initial validMember used to pre populate form
  @Input() initialMember: Member;
  @Input() initialEmail: string;
  // Member entered in form
  @Output() validChanges = new EventEmitter<UserFormChanges>();
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
  }

  /**
   * Subscribes to the form group and emit a new Member object if Member is valid.
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => this.onValueChanges());
  }

  onValueChanges(): void {
    const { valid, value } = this.formGroup;
    if (valid) {
      this.validChanges.emit({
        credentials: { email: value.email, password: value.password },
        member: Object.assign({}, new Member(value.firstName, value.lastName, this.initialMember ? this.initialMember.role : null), { id: this.initialMember ? this.initialMember.id : null }),
      });
    }
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        // If validMember was passed in, pre populate form, else leave blank
        firstName: [
          this.initialMember ? this.initialMember.firstName : '',
          [
            Validators.minLength(2),
            Validators.maxLength(35),
            Validators.required,
          ],
        ],
        lastName: [this.initialMember ? this.initialMember.lastName : '',
          [Validators.minLength(2),
            Validators.maxLength(35),
            Validators.required]],
        email: [
          this.initialMember ? this.initialEmail : '',
          [
            Validators.maxLength(255),
            Validators.required,
            Validators.email,
          ],
        ],
        password: [
          '',
          [
            Validators.minLength(8),
            Validators.maxLength(128),
            this.passwordRequiredValidator,
          ],
        ],
        confirmPassword: [''],
      },
      { validator: this.matchingPasswords('password', 'confirmPassword') },
    );
  }

  /**
   * Make password requirement conditional on passwordRequired.
   * @param {AbstractControl} control
   * @returns {{error: string}}
   */
  passwordRequiredValidator = (control: AbstractControl): { [key: string]: any } => {
    if (this.passwordRequired && !control.value) {
      return { error: 'required' };
    }
  }

  /**
   * Set confirmPassword control errors and form invalid if password and confirmPassword do not match.
   * @param {string} passwordKey
   * @param {string} confirmPasswordKey
   * @returns {(group: FormGroup) => {[p: string]: any}}
   */
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatchedPasswords: true });
        return { mismatchedPasswords: true };
      }
      confirmPassword.setErrors(null);
    };
  }
}
