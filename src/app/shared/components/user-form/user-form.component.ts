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
  template: `
    <form class="input-container" [formGroup]="formGroup" autocomplete="off">
      <mat-form-field class="input-container__row">
        <input type="email" matInput placeholder="Email" formControlName="email">
      </mat-form-field>
      <h4 *ngIf="edit">Optionally change your password here:</h4>
      <mat-form-field class="input-container__row">
        <input matInput type="password" formControlName="password" placeholder="Password">
      </mat-form-field>
      <mat-form-field class="input-container__row">
        <input
          matInput type="password"
          formControlName="confirmPassword"
          placeholder="Confirm Password"
          autocomplete="off"
        >
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() edit: boolean = false;
  @Input() initialEmail: string;
  @Output() validCredentials = new EventEmitter<Credentials>();
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        email: [
          this.initialEmail || '',
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
    this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
      const { valid, value } = this.formGroup;
      if (valid) {
        this.validCredentials.emit({ email: value.email, password: value.password });
      }
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Make password requirement conditional on edit.
   * @param {AbstractControl} control
   * @returns {{error: string}}
   */
  passwordRequiredValidator = (control: AbstractControl): { [key: string]: any } => {
    if (this.edit && !control.value) {
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
