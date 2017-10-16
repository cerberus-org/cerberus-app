import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as LoginActions from '../actions/login.actions'
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable()
export class LoginEffects {

  @Effect({ dispatch: false })
  login: Observable<Action> = this.actions
    .ofType(LoginActions.LOGIN)
    .map((action: LoginActions.Login) => action.payload)
    .switchMap(user => this.userService.login(user)
      .do((result: { user: User, token: string }) => {
        this.setLocalStorageItems(result.user, result.token);
        this.router.navigateByUrl('/dashboard');
        this.snackBarService.welcome(result.user.firstName);
      }));

  private setLocalStorageItems(user: User, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    localStorage.setItem('organizationId', user.organizationId);
    localStorage.setItem('userName', user.firstName);
  }

  constructor(private actions: Actions,
              private router: Router,
              private snackBarService: SnackBarService,
              private userService: UserService) {}
}
