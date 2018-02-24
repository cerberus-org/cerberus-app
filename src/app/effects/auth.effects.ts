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

import * as AuthActions from '../actions/auth.actions';
import { OrganizationService } from '../services/organization.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(AuthActions.LOAD_DATA)
    .map((action: AuthActions.LoadData) => action.payload)
    .switchMap(firebaseUser => this.userService.getById(firebaseUser.uid)
      .switchMap(res => {
        const user = Object.assign({}, res, { email: firebaseUser.email, id: firebaseUser.uid });
        return this.organizationService.getById(user.organizationId)
          .map(organization => {
            const org = Object.assign({}, organization, { id: user.organizationId });
            return new AuthActions.LoadDataSuccess({ user: user, organization: org })
          })
      }));

  constructor(private actions: Actions,
              private userService: UserService,
              private organizationService: OrganizationService) {}
}
