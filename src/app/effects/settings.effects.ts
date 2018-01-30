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
import * as SettingsActions from '../actions/settings.actions';
import { AuthService } from '../services/auth.service';
import { OrganizationService } from '../services/organization.service';
import { SnackBarService } from '../services/snack-bar.service';
import { VisitService } from '../services/visit.service';
import { VolunteerService } from '../services/volunteer.service';

@Injectable()
export class SettingsEffects {

  /**
   * Listen for the LoadVolunteersPage action, get the volunteers, then dispatch the success action.
   */
  @Effect()
  deleteVolunteer$: Observable<Action> = this.actions.ofType(SettingsActions.DELETE_VOLUNTEER)
    .map((action: SettingsActions.DeleteVolunteer) => action.payload)
    .switchMap(volunteer => this.volunteerService.delete(volunteer)
      .map(() => new SettingsActions.DeleteVolunteerSuccess(volunteer)));

  /**
   * Listen for the LoadVolunteersPage action, get the volunteers, then dispatch the success action.
   */
  @Effect()
  loadData$: Observable<Action> = this.actions.ofType(SettingsActions.LOAD_VOLUNTEERS_PAGE)
    .map((action: SettingsActions.LoadVolunteersPage) => action.payload)
    .switchMap(organizationId => this.volunteerService.getByKey('organizationId', organizationId, true)
      .map(volunteers => new SettingsActions.LoadVolunteersPageSuccess(volunteers)));

  /**
   * Listen for the UpdateUser action, update user,
   * then dispatch action to app store and display success snack bar.
   */
  @Effect()
  updateUser$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_USER)
    .map((action: SettingsActions.UpdateUser) => action.payload)
    .switchMap(user => this.authService.updateUser(user)
      .map(() => {
        this.snackBarService.updateUserSuccess();
        return new AppActions.SetUser(user)
      }));

  /**
   * Listen for the UpdateOrganization action, update organization,
   * then dispatch an action to app store and display success snack bar.
   */
  @Effect()
  updateOrganization$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_ORGANIZATION)
    .map((action: SettingsActions.UpdateOrganization) => action.payload)
    .switchMap(organization => this.organizationService.update(organization)
      .map(() => {
        this.snackBarService.updateOrganizationSuccess();
        return new AppActions.SetOrganization(organization)
      }));

  /**
   * Listen for the getVisitsByDateAndOrganization action, get visits by start date, end date, and organizationId
   * then dispatch an action to the settings store.
   * @type {Observable<LoadVisitsByDatesSuccess>}
   */
  @Effect()
  loadVisitsByDateAndOrganization$: Observable<Action> = this.actions
    .ofType(SettingsActions.LOAD_VISITS_BY_DATE_AND_ORGANIZATION)
    .map((action: SettingsActions.LoadVisitsByDateAndOrganization) => action.payload)
    .switchMap(payload => this.visitService.getByDateAndOrganization(payload.startedAt, payload.endedAt, payload.organizationId, true)
      .map(visits => {
        return new SettingsActions.LoadVisitsByDateAndOrganizationSuccess(visits)
      }));

  constructor(private actions: Actions,
              private authService: AuthService,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService,
              private volunteerService: VolunteerService) {
  }
}
