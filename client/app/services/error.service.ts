import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErrorService {
  public httpStatuses: Map<number, string>;

  constructor(private router: Router, private snackBar: MdSnackBar) {
    this.httpStatuses = new Map<number, string>([
      [401, 'Session expired!'],
      [504, 'Server error!'],
      [403, 'Invalid Credentials!']
    ]);
  }

  /**
   * Display the error using a snack bar and then log the error.
   * @param error
   * @return {any}
   */
  handleHttpError (error: any | Response) {
    // Display error
    this.openSnackBar(error, this.httpStatuses.get(error.status) ? this.httpStatuses.get(error.status) : 'Error');
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
  openSnackBar (error, message) {
    this.snackBar.open(message, '', { duration: 3000 })
  }

  /**
   * If the error is 401, remove the token and reroute the user to the login page.
   * @param error
   */
  handleTokenExpiration(error: any | Response) {
    // If the token has expired
    if (error.status === 401) {
      // Remove the token so login and onLogout buttons can be accurately displayed or hidden
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }
}


export class MockErrorService extends ErrorService {

  constructor() {
    super(null, null);
  }

  handleHttpError(error: any | Response) {
    try {
      return Observable.throw(error);
    } catch (Error) {
      console.error(error);
    }
  }

  openSnackBar() {}
}

