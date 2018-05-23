import { Injectable } from '@angular/core';
import { FirebaseError } from 'firebase';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/index';

import { SnackBarService } from './snack-bar.service';

@Injectable()
export class ErrorService {

  constructor(public snackBarService: SnackBarService) { }

  /**
   * Displays the error via snack bar and stops any Observable pipeline.
   * @param error - the error from Firebase
   * @return {Observable<any>} an Observable that stops a pipeline
   */
  handleFirebaseError(error: FirebaseError): Observable<any> {
    this.snackBarService.open(error.message);
    // Stop the pipeline after a caught error
    return Observable.of(null).filter(e => !!e);
  }

  handleLoginError(error: FirebaseError): Observable<any> {
    this.snackBarService.signInError();
    return Observable.of(null).filter(e => !!e);
  }
}

export class MockErrorService extends ErrorService {

  constructor() {
    super(null);
  }

  handleFirebaseError(error: FirebaseError) {
    return Observable.of(null).filter(e => !!e);
  }

  handleLoginError(error: FirebaseError) {
    return Observable.of(null).filter(e => !!e);
  }
}

