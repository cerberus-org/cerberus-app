import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SnackBarService } from './snack-bar.service';

@Injectable()
export class ErrorService {

  constructor(private snackBarService: SnackBarService) { }

  /**
   * Display the error using a snack bar and then log the error.
   * @param error
   * @return {any}
   */
  handleFirebaseError(error: any | Response) {
    console.log('CAUGHT!');
    this.snackBarService.open(error.message);
    return Observable.throw(new Error(error.code))
  }
}


export class MockErrorService extends ErrorService {

  constructor() {
    super(null);
  }

  handleFirebaseError(error: any | Response) {
    try {
      return Observable.throw(error);
    } catch (Error) {
      console.error(error);
    }
  }
}

