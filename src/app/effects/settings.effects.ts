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
import * as SettingsActions from '../actions/settings.actions';
import { getVisitsWithVolunteerNames } from '../functions/transducer';
import {
  AuthService,
  CsvService,
  OrganizationService,
  SnackBarService,
  VisitService,
  VolunteerService,
} from '../services';

@Injectable()
export class SettingsEffects {

  /**
   * Listen for the deleteVolunteer action then delete the volunteer in the payload.
   */
  @Effect({ dispatch: false })
  deleteVolunteer$: Observable<Action> = this.actions.ofType(SettingsActions.DELETE_VOLUNTEER)
    .map((action: SettingsActions.DeleteVolunteer) => action.payload)
    .switchMap(volunteer => this.volunteerService.delete(volunteer));

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
        return new AuthActions.UpdateOrganization(organization);
      }));

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
        return new AuthActions.UpdateUser(user);
      }));

  /**
   * Listen for the GenerateVisitHistoryReport, get visits by date range and organization,
   * then download data as csv.
   * @type {Observable<Visit[]>}
   */
  @Effect({ dispatch: false })
  generateVisitHistoryReport$ = this.actions
    .ofType(SettingsActions.GENERATE_VISIT_HISTORY_REPORT)
    .map((action: SettingsActions.GenerateVisitHistoryReport) => action.payload)
    .switchMap(payload => this.visitService
      .getByDateAndOrganization(payload.startedAt, payload.endedAt, payload.organizationId, true)
      .do((visits) => {
        this.csvService.downloadAsCsv(
          getVisitsWithVolunteerNames(visits, payload.volunteers), 'VisitHistory.csv', new Map([
            ['name', 'Name'],
            ['startedAt', 'Started At'],
            ['endedAt', 'Ended At'],
            ['duration', 'Duration'],
          ]),
        );
      }));

  constructor(private actions: Actions,
              private authService: AuthService,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService,
              private visitService: VisitService,
              private volunteerService: VolunteerService,
              private csvService: CsvService) {
  }
}
