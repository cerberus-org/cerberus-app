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
import { getVisitsWithVolunteerNames } from '../functions/transducer';
import { AuthService } from '../services/auth.service';
import { CsvService } from '../services/csv.service';
import { OrganizationService } from '../services/organization.service';
import { SnackBarService } from '../services/snack-bar.service';
import { VisitService } from '../services/visit.service';
import { VolunteerService } from '../services/volunteer.service';

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
   * Listen for the GenerateVisitHistoryReport, get visits by date range and organization,
   * then download data as csv.
   * @type {Observable<Visit[]>}
   */
  @Effect({ dispatch: false })
  generateVisitHistoryReport$ = this.actions
    .ofType(SettingsActions.GENERATE_VISIT_HISTORY_REPORT)
    .map((action: SettingsActions.GenerateVisitHistoryReport) => action.payload)
    .switchMap(payload => this.visitService.getByDateAndOrganization(payload.startedAt, payload.endedAt, payload.organizationId, true)
      .do(visits => {
        const propertiesToColumnTitles = new Map([
          ['name', 'Name'],
          ['startedAt', 'Started At'],
          ['endedAt', 'Ended At'],
          ['duration', 'Duration'],
        ]);
        this.csvService.downloadAsCsv(
          getVisitsWithVolunteerNames(visits, payload.volunteers), 'VisitHistory.csv', propertiesToColumnTitles
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
