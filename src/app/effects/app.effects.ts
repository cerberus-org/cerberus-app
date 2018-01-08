import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as AppActions from '../actions/app.actions';
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {

  /**
   * The payload is the afUser. Get User by using afUser uid. Dispatch action and
   * pass in User object with fields from afUser and User.
   * @type {Observable<SetUserSuccess>}
   */
  @Effect()
  setUser$: Observable<Action> = this.actions
    .ofType(AppActions.SET_USER)
    .map((action: AppActions.SetUser) => action.payload)
    .switchMap(afUser => this.userService.getById(afUser.user.uid)
      .map(user => {
        return new AppActions.SetUserSuccess(Object.assign({}, user, { email: afUser.user.email }))
      }));

  constructor(private actions: Actions,
              private snackBarService: SnackBarService,
              private userService: UserService) {}
}
