import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RouterActions from '../../core/store/actions/router.actions';
import { AppState } from '../../core/store/reducers';
import { AuthService } from '../services/auth.service';

/**
 * This guard is used in conjunction with verification dialog.
 * The purpose of this guard is to prevent direct access to URL's
 * that require password verification.
 */
@Injectable()
export class VerificationGuard implements CanActivate {

  constructor(private authService: AuthService, private store$: Store<AppState>) {}

  /**
   * When a user attempts to access the admin page via URL,
   * check if a certain boolean value in AuthService is true.
   * Grant access if true else redirect to volunteers module.
   * @returns {boolean}
   */
  public canActivate(): boolean {
    if (this.authService.isPwdValid()) {
      // Set boolean value to false after access is granted so
      // verification is required each time
      this.authService.setPwdVerification(false);
      return true;
    }
    this.store$.dispatch(
      new RouterActions.Go({ path: ['organization/volunteers'] }),
    );
    return false;
  }
}
