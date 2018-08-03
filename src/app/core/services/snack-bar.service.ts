import { Injectable } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, action: string = '', duration: number = 5000): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration });
  }

  signInSuccess(name: string): MatSnackBarRef<SimpleSnackBar> {
    return this.open(`Welcome, ${name}.`);
  }

  signOutSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('You have been successfully logged out.');
  }

  createVolunteerSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully signed up.');
  }

  createUserSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('User successfully created.');
  }

  updateUserSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Member information successfully updated.');
  }

  updateVisitsSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Visits were successfully updated');
  }

  updateOrganizationSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Organization information successfully updated.');
  }

  checkInSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully checked in.');
  }

  checkOutSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully checked out.');
  }

  joinTeamSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully requested to join an organization.');
  }

  createTeamSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Your team was successfully created.');
  }

  accountNotVerified(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Your account has not been verified yet.');
  }

  resetPassword(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('If your email is associated with an organization, you will receive an email.');
  }

  signInError(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Unsuccessful login.');
  }

  updateAvailable(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('A new version of Cerberus is available.', 'Reload', 10000);
  }

  createSiteSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully created a site.');
  }

  updateSiteSuccess():MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully updated a site.');
  }

  updateVisitSuccess():MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully updated a visit.');
  }
}
