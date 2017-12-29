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

import * as SettingsActions from '../actions/settings.actions';
import { getLocalStorageObjectProperty } from '../functions/localStorageObject';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { SnackBarService } from '../services/snack-bar.service';

@Injectable()
export class SettingsEffects {

  /**
   * Listen for the UpdateUser action, update user,
   * then emit the success snack bar.
   */
  @Effect()
  updateUser$: Observable<Action> = this.actions
    .ofType(SettingsActions.UPDATE_USER)
    .map((action: SettingsActions.UpdateUser) => action.payload)
    .switchMap(user => this.authService.updateUser(user)
      .map(() => {
        this.snackBarService.updateUserSuccess();
        return new SettingsActions.UpdateUserSuccess();
      }));

  /**
   * Listen for the UpdateOrganization action, update organization,
   * then emit the success snack bar.
   */
  @Effect()
  updateOrganization$: Observable<Action> = this.actions
    .ofType(SettingsActions.UPDATE_ORGANIZATION)
    .map((action: SettingsActions.UpdateOrganization) => action.payload)
    .switchMap(organization => this.organizationService.updateAndSetLocalStorage(
      Object.assign({}, organization, { id: getLocalStorageObjectProperty('organization', 'id') })
    ))
    .map(() => {
      this.snackBarService.updateOrganizationSuccess();
      return new SettingsActions.UpdateOrganizationSuccess();
    });

  constructor(private actions: Actions,
              private snackBarService: SnackBarService,
              private authService: AuthService,
              private organizationService: OrganizationService) {
  }
}
