import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as LoginActions from '../actions/login.actions'
import { User } from '../models/user';
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';
import { OrganizationService } from '../services/organization.service';

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
    .map((action: LoginActions.Login) => action.payload)
    .switchMap(user => this.userService.login(user)
      .switchMap((results: { user: User, token: string }) => {
        localStorage.setItem('token', results.token);
        localStorage.setItem('userId', results.user._id);
        localStorage.setItem('userName', results.user.firstName);
        localStorage.setItem('organizationId', results.user.organizationId);
        // Get organization to store name in localStorage for use with header text
        return this.organizationService.getById(results.user.organizationId)
          .do(organization => {
            localStorage.setItem('organizationName', organization.name);
            this.router.navigateByUrl('/dashboard');
            this.snackBarService.loginSuccess(results.user.firstName);
          })
      }));

  /**
   * Listen for the Logout action, log the user out,
   * then remove the items from localStorage.
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  logout$: Observable<Action> = this.actions
    .ofType(LoginActions.LOGOUT)
    .do(() => {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      this.snackBarService.logoutSuccess();
    });

  constructor(private actions: Actions,
              private router: Router,
              private snackBarService: SnackBarService,
              private organizationService: OrganizationService,
              private userService: UserService) {}
}
