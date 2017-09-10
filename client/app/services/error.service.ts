import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export default class ErrorService {
  public httpStatuses: Map<number, string>;

  constructor(private router: Router, private snackBar: MdSnackBar) {
    this.httpStatuses = new Map<number, string>([
      [401, 'Session Expired'],
      [504, 'Server Error']
    ]);
  }

  /**
   * Display the error using a snack bar and then log the error.
   * @param error
   * @return {any}
   */
  handleHttpError (error: any | Response) {
    // Display error
    this.snackBarError(error, this.httpStatuses.get(error.status) ? this.httpStatuses.get(error.status) : 'An error occurred');
    // Consider the special case that the token is expired
    this.handleTokenExpiration(error);
    // Handle error
    try {
      return Observable.throw(error || 'Server error');
    } catch (Error) {
      console.error(error);
    }
  }

  /**
   * Display the message in a snack bar for 3000 ms.
   * @param error
   * @param message
   */
  snackBarError (error, message) {
    this.snackBar.open(message, '', { duration: 3000 })
  }

  /**
   * If the error is 401, remove the token and reroute the user to the login page.
   * @param error
   */
  handleTokenExpiration(error: any | Response) {
    // If the token has expired
    if (error.status === 401) {
      // Remove the token
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }
}
