import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  loginSuccess(name: string): void {
    this.open(`Welcome, ${name}.`);
  }

  logoutSuccess(): void {
    this.open('You have been successfully logged out.');
  }

  addOrganizationSuccess(): void {
    this.open('Your organization was successfully added.');
  }

  signUpSuccess(): void {
    this.open('Volunteer successfully signed up.');
  }

  updateUserSuccess(): void {
    this.open('User information successfully updated.');
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
}

export class MockSnackBarService extends SnackBarService {

  constructor() {
    super(null);
  }

  open(message: string): void { }
}
