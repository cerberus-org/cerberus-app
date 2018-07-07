import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  signInSuccess(name: string): void {
    this.open(`Welcome, ${name}.`);
  }

  signOutSuccess(): void {
    this.open('You have been successfully logged out.');
  }

  createOrganizationSuccess(): void {
    this.open('Your organization was successfully added.');
  }

  signUpSuccess(): void {
    this.open('Volunteer successfully signed up.');
  }

  updateUserSuccess(): void {
    this.open('Member information successfully updated.');
  }

  updateVisitsSuccess(): void {
    this.open('Visits were successfully updated');
  }

  updateOrganizationSuccess(): void {
    this.open('Organization information successfully updated.');
  }

  checkInSuccess(): void {
    this.open('Volunteer successfully checked in.');
  }

  checkOutSuccess(): void {
    this.open('Volunteer successfully checked out.');
  }

  joinOrganizationSuccess(): void {
    this.open('Successfully requested to join an organization.');
  }

  invalidOrganization(): void {
    this.open('Invalid organization.');
  }

  accountNotVerified(): void {
    this.open('Your account has not been verified yet.');
  }

  resetPassword(): void {
    this.open('If your email is associated with an organization, you will receive an email.');
  }

  signInError(): void {
    this.open('Unsuccessful login.');
  }
}
