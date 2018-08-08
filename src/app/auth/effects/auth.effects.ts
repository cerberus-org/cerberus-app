import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { defer } from 'rxjs/internal/observable/defer';
import { of } from 'rxjs/internal/observable/of';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as RouterActions from '../../core/actions/router.actions';
import { MemberService } from '../../core/services/member.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Credentials } from '../../shared/models/credentials';
import * as AuthActions from '../actions/auth.actions';
import { SessionReducerState } from '../reducers/session.reducer';
import { getUserInfo } from '../selectors/session.selectors';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

  /**
   * Listen for the SignIn action, log the afUser in, retrieve Member,
   * display success snackbar and navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  signUp$: Observable<Action> = this.actions
    .ofType(AuthActions.SIGN_UP)
    .pipe(
      map((action: AuthActions.SignUp) => action.payload),
      switchMap(({ credentials }) => this.authService.createUser(credentials)
        .pipe(
          map(() => {
            this.snackBarService.createUserSuccess();
            return new AuthActions.SignIn(credentials);
          }),
        )),
    );

  /**
   * Listen for the SignIn action, log the afUser in, retrieve Member,
   * display success snackbar and navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  signIn$: Observable<Action> = this.actions
    .ofType(AuthActions.SIGN_IN)
    .pipe(
      map((action: AuthActions.SignIn) => action.payload),
      switchMap((credentials: Credentials) => this.authService.signIn(credentials)
        .pipe(
          map(() => {
            this.snackBarService.signInSuccess();
            return new RouterActions.Go({ path: ['teams'] });
          }),
        )),
    );

  /**
   * Listen for the Verify action, verify password,
   * navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  verifyPassword$: Observable<Action> = this.actions
    .ofType(AuthActions.VERIFY_PASSWORD)
    .pipe(
      map((action: AuthActions.VerifyPassword) => action.payload),
      withLatestFrom(this.store$.pipe(select(getUserInfo))),
      switchMap(([password, { email }]) => this.authService.signIn({ password, email })
        .pipe(
          map(() => {
            this.authService.setPwdVerification(true);
            return new RouterActions.Go({ path: ['team/settings'] });
          }),
        )),
    );

  /**
   * Listen for the SignOut action, log the user out,
   * navigate to login page on success.
   * @type {Observable<any>}
   */
  @Effect()
  signOut$: Observable<Action> = this.actions
    .ofType(AuthActions.SIGN_OUT)
    .pipe(
      switchMap(() => this.authService.signOut()
        .pipe(
          map(() => {
            this.snackBarService.signOutSuccess();
            return new RouterActions.Go({ path: [''] });
          }),
        )),
    );

  /**
   * Listen for the ResetPassword action,
   * send email to user and display snackbar.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  resetPassword$: Observable<void> = this.actions
    .ofType(AuthActions.RESET_PASSWORD)
    .pipe(
      map((action: AuthActions.ResetPassword) => action.payload),
      switchMap((email: string) => this.authService.resetPassword(email)
        .pipe(
          tap(() => {
            this.snackBarService.resetPassword();
          }),
        )),
    );

  @Effect({ dispatch: false })
  init$: Observable<any> = defer(() => of(null)).pipe(
    tap(() => {
      this.authService.observeStateChanges();
    }),
  );

  constructor(
    private store$: Store<SessionReducerState>,
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private snackBarService: SnackBarService,
  ) {}
}
