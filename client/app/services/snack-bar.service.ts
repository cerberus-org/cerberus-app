import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(private snackBar: MdSnackBar) { }

  emit(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

  welcome(name: string) {
    this.emit(`Welcome, ${name}.`);
  }

  welcomeBack(name: string) {
    this.emit(`Welcome back, ${name}.`);
  }

  addOrganizationSuccess() {
    this.emit('Your organization was successfully added.');
  }

  signUpSuccess() {
    this.emit('Volunteer successfully signed up.')
  }

  checKInSuccess() {
    this.emit('Volunteer successfully checked in.')
  }

  checKOutSuccess() {
    this.emit('Volunteer successfully checked out.')
  }
}
