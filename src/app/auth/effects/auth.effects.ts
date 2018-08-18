import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Go } from '../../core/actions/router.actions';
import { UserService } from '../../core/services/user.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Credentials } from '../../shared/models/credentials';
import { AuthActionTypes, ResetPassword, SignIn, SignOut, SignUp, VerifyPassword } from '../actions/auth.actions';
import { AuthReducerState } from '../reducers/auth.reducer';
import { getUserInfoEmail } from '../selectors/auth.selectors';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private store$: Store<AuthReducerState>,
    private actions: Actions,
    private authService: AuthService,
    private userService: UserService,
    private snackBarService: SnackBarService,
  ) {}

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => {
      this.authService.observeStateChanges();
    }),
  );

  /**
   * Listens for the SignUp action, creates the user in Firebase Authentication, uses the created user's UID to create
   * a user, then displays a success snackbar and signs the user in.
   * @type {Observable<any>}
   */
  @Effect()
  signUp$: Observable<Action> = this.actions.pipe(
    ofType<SignUp>(AuthActionTypes.SignUp),
    map(action => action.payload),
    switchMap(({ credentials, user }) => this.authService.createUser(credentials).pipe(
      switchMap(userInfo => this.userService.add(user, userInfo.uid).pipe(
        map(() => {
          this.snackBarService.createUserSuccess();
          return new SignIn({ credentials });
        }),
      )),
    )),
  );

  /**
   * Listen for the SignIn action, log the afUser in, retrieve Member,
   * display success snackbar and navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  signIn$: Observable<Action> = this.actions.pipe(
    ofType<SignIn>(AuthActionTypes.SignIn),
    map(action => action.payload.credentials),
    switchMap((credentials: Credentials) => this.authService.signIn(credentials).pipe(
      map(() => {
        this.snackBarService.signInSuccess();
        return new Go({ path: ['teams'] });
      }),
    )),
  );

  /**
   * Listen for the Verify action, verify password,
   * navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  verifyPassword$: Observable<Action> = this.actions.pipe(
    ofType<VerifyPassword>(AuthActionTypes.VerifyPassword),
    map(action => action.payload.password),
    withLatestFrom(this.store$.pipe(select(getUserInfoEmail))),
    switchMap(([password, email]) => this.authService.signIn({ password, email }).pipe(
      map(() => {
        this.authService.setPwdVerification(true);
        return new Go({ path: ['team/settings'] });
      }),
    )),
  );

  /**
   * Listen for the SignOut action, log the user out,
   * navigate to login page on success.
   * @type {Observable<any>}
   */
  @Effect()
  signOut$: Observable<Action> = this.actions.pipe(
    ofType<SignOut>(AuthActionTypes.SignOut),
    switchMap(() => this.authService.signOut().pipe(
      map(() => {
        this.snackBarService.signOutSuccess();
        return new Go({ path: [''] });
      }),
    )),
  );

  /**
   * Listen for the ResetPassword action,
   * send email to user and display snackbar.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  resetPassword$: Observable<void> = this.actions.pipe(
    ofType<ResetPassword>(AuthActionTypes.ResetPassword),
    map(action => action.payload.email),
    switchMap((email: string) => this.authService.resetPassword(email).pipe(
      tap(() => {
        this.snackBarService.resetPassword();
      }),
    )),
  );
}
