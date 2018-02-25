import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss']
})
export class JoinPageComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      email: ['', [Validators.maxLength(255), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128), Validators.required]],
      confirmPassword: ['', Validators.required],
      organizationName: ['', Validators.required],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }

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

  onJoinOrganization() {

  }
}
