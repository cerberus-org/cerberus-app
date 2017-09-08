import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export default class ErrorService {
  constructor(private router: Router) {}

  handleHttpError (error: any | Response) {
    // If the token has expired
    if (error.status === 401) {
      // Remove the token
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
    try {
      return Observable.throw(error || 'Server error');
    } catch (Error) {
      console.error(error);
      return error;
    }
  }
}
