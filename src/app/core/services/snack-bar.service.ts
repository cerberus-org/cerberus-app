import { Injectable } from '@angular/core';
import { MatSnackBar, SimpleSnackBar } from '@angular/material';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';

@Injectable({ providedIn: 'root' })
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string = '', duration: number = 5000): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, { duration });
  }

  cancelRequestSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Your request to join was cancelled.');
  }

  checkInSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully checked in.');
  }

  checkOutSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully checked out.');
  }

  createSiteSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully created a site.');
  }

  createTeamSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Your team was successfully created.');
  }

  createUserSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('User successfully created.');
  }

  createVolunteerSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer successfully signed up.');
  }

  joinTeamSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully requested to join an team.');
  }

  removeMemberSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Member successfully removed.');
  }

  removeSiteSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Site was successfully removed.');
  }

  removeVolunteerSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Volunteer was successfully removed.');
  }

  resetPassword(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('If your email is associated with an team, you will receive an email.');
  }

  signInError(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Unsuccessful login.');
  }

  signInSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open(`Welcome.`);
  }

  signOutSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('You have been successfully logged out.');
  }

  updateAvailable(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('A new version of Cerberus is available.', 'Reload', 10000);
  }

  updateSiteSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully updated a site.');
  }

  updateTeamSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Team information successfully updated.');
  }

  updateUserSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Member information successfully updated.');
  }

  updateVisitSuccess(): MatSnackBarRef<SimpleSnackBar> {
    return this.open('Successfully updated a visit.');
  }
}
