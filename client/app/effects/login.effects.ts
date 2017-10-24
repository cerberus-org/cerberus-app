import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as LoginActions from '../actions/login.actions';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class LoginEffects {

  /**
   * Listen for the Login action, log the user in, retrieve the user's organization,
   * then store the results in localStorage.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  login$: Observable<Action> = this.actions
    .ofType(LoginActions.LOGIN)
    .do((action: LoginActions.Login) => {
      const payload = action.payload;
      this.authService.signIn(payload.email, payload.password)
        .do(user => {
          this.router.navigateByUrl('/dashboard');
          this.snackBarService.loginSuccess(user.firstName);
        });
    });

  /**
   * Listen for the Logout action, log the user out,
   * then remove the items from localStorage.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions
    .ofType(LoginActions.LOGOUT)
    .do(() => {
      this.authService.signOut()
        .do(() => {
          this.router.navigateByUrl('/login');
          this.snackBarService.logoutSuccess();
        });
    });

  constructor(private actions: Actions,
              private router: Router,
              private authService: AuthService,
              private snackBarService: SnackBarService) {}
}
