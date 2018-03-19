import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as LoginActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';
import { AuthService, SnackBarService, UserService } from '../services';

@Injectable()
export class LoginEffects {

  /**
   * Listen for the LogIn action, log the afUser in, retrieve User,
   * display success snackbar and navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  login$: Observable<Action> = this.actions
    .ofType(LoginActions.LOG_IN)
    .map((action: LoginActions.LogIn) => action.payload)
    .switchMap(payload => this.authService.signIn(payload.email, payload.password)
      .switchMap(res => this.userService.getById(res.uid)
        .map((user) => {
          if (user.role === 'Locked') {
            this.authService.signOut();
            this.snackBarService.accountNotVerified();
          } else {
            this.snackBarService.loginSuccess(user.firstName);
            return new RouterActions.Go({ path: ['/dashboard'] });
          }
        }),
      ));

  /**
   * Listen for the Verify action, verify password,
   * navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  verifyPassword$: Observable<Action> = this.actions
    .ofType(LoginActions.VERIFY_PASSWORD)
    .map((action: LoginActions.VerifyPassword) => action.payload)
    .switchMap(payload => this.authService.signIn(payload.email, payload.password)
      .map(() => {
        this.authService.setPwdVerification(true);
        return new RouterActions.Go({ path: ['/settings'] });
      }));

  /**
   * Listen for the LogOut action, log the user out,
   * navigate to login page on success.
   * @type {Observable<any>}
   */
  @Effect()
  logout$: Observable<Action> = this.actions
    .ofType(LoginActions.LOG_OUT)
    .switchMap(() => this.authService.signOut()
      .map(() => {
        this.snackBarService.logoutSuccess();
        return new RouterActions.Go({ path: ['/home'] });
      }));

  /**
   * Listen for the ResetPassword action,
   * send email to user and display snackbar.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  resetPassword$: Observable<{}> = this.actions
    .ofType(LoginActions.RESET_PASSWORD)
    .switchMap((action: LoginActions.ResetPassword) => this.authService.resetPassword(action.payload)
      .do(() => {
        this.snackBarService.resetPassword();
      }));

  constructor(private actions: Actions,
              private authService: AuthService,
              private userService: UserService,
              private snackBarService: SnackBarService) {}
}
