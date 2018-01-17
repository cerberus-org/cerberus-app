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
import { OrganizationService } from '../services/organization.service';
import { SnackBarService } from '../services/snack-bar.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AppEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions
    .ofType(AppActions.LOAD_DATA)
    .map((action: AppActions.LoadData) => action.payload)
    .switchMap(fbUser => this.userService.getById(fbUser.uid)
      .switchMap(res => {
        const user = Object.assign({}, res, { email: fbUser.email, id: fbUser.uid });
        return this.organizationService.getById(user.organizationId)
          .map(organization => {
            const org = Object.assign({}, organization, { id: user.organizationId });
            return new AppActions.LoadDataSuccess({ user: user, organization: org} )
          })
      }));

  constructor(private actions: Actions,
              private snackBarService: SnackBarService,
              private userService: UserService,
              private organizationService: OrganizationService) {}
}
