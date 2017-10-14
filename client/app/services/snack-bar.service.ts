import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string): void {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  welcome(name: string): void {
    this.open(`Welcome, ${name}.`);
  }

  welcomeBack(name: string): void {
    this.open(`Welcome back, ${name}.`);
  }

  addOrganizationSuccess(): void {
    this.open('Your organization was successfully added.');
  }

  signUpSuccess(): void {
    this.open('Volunteer successfully signed up.')
  }

  checkInSuccess(): void {
    this.open('Volunteer successfully checked in.')
  }

  checkOutSuccess(): void {
    this.open('Volunteer successfully checked out.')
  }
}

export class MockSnackBarService extends SnackBarService {

  constructor() {
    super(null);
  }

  open(message: string): void { }
}
