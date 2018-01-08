import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../actions/app.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions
    .ofType(AppActions.LOAD_DATA)
    .map((action: AppActions.LoadData) => action)
    .switchMap(() => this.authService.getCurrentUser()
      .map(user => {
        return new AppActions.LoadDataSuccess(user)
      }));

  constructor(private actions: Actions,
              private authService: AuthService) {}
}
