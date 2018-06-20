import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { User as FirebaseUser } from 'firebase';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService, SnackBarService, UserService } from '../../../services';

import * as LoginActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';

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
    .pipe(
      map((action: LoginActions.LogIn) => action.payload),
      switchMap(payload => this.authService.signIn(payload.email, payload.password)
        .pipe(
          switchMap((firebaseUser: FirebaseUser) => this.userService.getById(firebaseUser.uid)
            .pipe(
              map((user) => {
                if (user.role === 'Locked') {
                  this.authService.signOut();
                  this.snackBarService.accountNotVerified();
                } else {
                  this.snackBarService.loginSuccess(user.firstName);
                  return new RouterActions.Go({ path: ['/dashboard'] });
                }
              }),
            )),
        )),
    );

  /**
   * Listen for the Verify action, verify password,
   * navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  verifyPassword$: Observable<Action> = this.actions
    .ofType(LoginActions.VERIFY_PASSWORD).pipe(
      map((action: LoginActions.VerifyPassword) => action.payload),
      switchMap(payload => this.authService.signIn(payload.email, payload.password)
        .pipe(
          map(() => {
            this.authService.setPwdVerification(true);
            return new RouterActions.Go({ path: ['/settings'] });
          }),
        )),
    );

  /**
   * Listen for the LogOut action, log the user out,
   * navigate to login page on success.
   * @type {Observable<any>}
   */
  @Effect()
  logout$: Observable<Action> = this.actions
    .ofType(LoginActions.LOG_OUT)
    .pipe(
      switchMap(() => this.authService.signOut()
        .pipe(
          map(() => {
            this.snackBarService.logoutSuccess();
            return new RouterActions.Go({ path: ['/home'] });
          }),
        )),
    );

  /**
   * Listen for the ResetPassword action,
   * send email to user and display snackbar.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  resetPassword$: Observable<{}> = this.actions
    .ofType(LoginActions.RESET_PASSWORD)
    .pipe(
      switchMap((action: LoginActions.ResetPassword) => this.authService.resetPassword(action.payload)
        .pipe(
          tap(() => {
            this.snackBarService.resetPassword();
          }),
        )),
    );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private userService: UserService,
    private snackBarService: SnackBarService,
  ) {}
}
