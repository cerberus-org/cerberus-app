/**
 * This guard is used in conjunction with verification dialog.
 * The purpose of this guard is to prevent direct access to URL's
 * that require password verification.
 */

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import * as RouterActions from './actions/router.actions';
import { State } from './reducers';
import { AuthService } from './services/auth.service';

@Injectable()
export class VerificationGuard implements CanActivate {

  constructor(private authService: AuthService,
              private store: Store<State>) {}
  /**
   * When a user attempts to access the admin page via URL,
   * check if a certain boolean value in AuthService is true.
   * Grant access if true else redirect to dashboard.
   * @returns {boolean}
   */
  public canActivate(): boolean {
    if (this.authService.isPwdValid()) {
      // Set boolean value to false after access is granted so
      // verification is required each time
      this.authService.setPwdVerification(false);
      return true;
    }
    this.store.dispatch(
      new RouterActions.Go({ path: ['/dashboard'] })
    );
    return false;
  }
}
