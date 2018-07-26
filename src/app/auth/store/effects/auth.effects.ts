import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { MemberService } from '../../../core/services/member.service';
import { Credentials } from '../../../shared/models/credentials';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { SessionReducerState } from '../reducers/session.reducer';
import { selectSessionUserInfo } from '../selectors/session.selectors';

@Injectable()
export class AuthEffects {

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
          switchMap(({ uid }) => this.memberService.getByKey('userUid', uid)
            .pipe(
              map(([{ firstName, role }]) => {
                if (role === 'Locked') {
                  this.snackBarService.accountNotVerified();
                  return new RouterActions.Go({ path: ['/home'] });
                }
                this.snackBarService.signInSuccess(firstName);
                return new RouterActions.Go({ path: ['/dashboard'] });
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
    .ofType(AuthActions.VERIFY_PASSWORD)
    .pipe(
      map((action: AuthActions.VerifyPassword) => action.payload),
      withLatestFrom(this.store$.pipe(select(selectSessionUserInfo))),
      switchMap(([password, { email }]) => this.authService.signIn({ password, email })
        .pipe(
          map(() => {
            this.authService.setPwdVerification(true);
            return new RouterActions.Go({ path: ['/settings'] });
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

  constructor(
    private store$: Store<SessionReducerState>,
    private actions: Actions,
    private authService: AuthService,
    private memberService: MemberService,
    private snackBarService: SnackBarService,
  ) {}
}
