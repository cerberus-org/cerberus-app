import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as JoinActions from '../actions/join.actions';
import { OrganizationService } from '../services/organization.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class JoinEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions
    .ofType(JoinActions.LOAD_DATA)
    .switchMap(() => this.organizationService.getAll()
      .map(organizations => {
        return new JoinActions.LoadDataSuccess(organizations);
      }));

  constructor(private actions: Actions,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService) {}
}
