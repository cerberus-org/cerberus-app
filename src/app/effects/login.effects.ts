import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as LoginActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';
import { getLocalStorageObjectProperty } from '../functions/localStorageObject';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class LoginEffects {

  /**
   * Listen for the LogIn action, log the user in, retrieve the user's organization,
   * then store the results in localStorage.
   * @type {Observable<any>}
   */
  @Effect()
  login$: Observable<Action> = this.actions
    .ofType(LoginActions.LOG_IN)
    .map((action: LoginActions.LogIn) => action.payload)
    .switchMap(payload => this.authService.signIn(payload.email, payload.password)
      .map(user => {
        this.snackBarService.loginSuccess(user.firstName);
        return new RouterActions.Go({ path: ['/dashboard'] });
      }));

  /**
   * Listen for a Verify action, verify password,
   * navigate to settings page on success.
   * @type {Observable<any>}
   */
  @Effect()
  pwdVerification$: Observable<Action> = this.actions
    .ofType(LoginActions.VERIFY)
    .map((action: LoginActions.Verify) => action.payload)
    .switchMap(payload => this.authService.signIn(getLocalStorageObjectProperty('user', 'email'), payload)
      .map(() => {
        this.authService.setPwdVerification(true);
        return new RouterActions.Go({ path: ['/settings'] });
      }));

  /**
   * Listen for the LogOut action, log the user out,
   * then remove the items from localStorage.
   * @type {Observable<any>}
   */
  @Effect()
  logout$: Observable<Action> = this.actions
    .ofType(LoginActions.LOG_OUT)
    .switchMap(() => this.authService.signOut()
      .map(() => {
        this.snackBarService.logoutSuccess();
        return new RouterActions.Go({ path: ['/login'] });
      }));

  constructor(private actions: Actions,
              private authService: AuthService,
              private snackBarService: SnackBarService) {}
}
