import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import * as SessionActions from '../../../auth/store/actions/session.actions';
import { OrganizationService } from '../../../data/services/organization.service';
import { UserService } from '../../../data/services/user.service';
import { VisitService } from '../../../data/services/visit.service';
import { VolunteerService } from '../../../data/services/volunteer.service';
import { getVisitsWithVolunteerNames } from '../../../functions/index';
import { Organization, User, Visit } from '../../../models/index';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CsvService } from '../../services/csv.service';
import * as SettingsActions from '../actions/settings.actions';

@Injectable()
export class SettingsEffects {

  /**
   * Listen for the deleteVolunteer action then delete the volunteer in the payload.
   */
  @Effect({ dispatch: false })
  deleteVolunteer$: Observable<Action> = this.actions.ofType(SettingsActions.DELETE_VOLUNTEER)
    .pipe(
      map((action: SettingsActions.DeleteVolunteer) => action.payload),
      switchMap(volunteer => this.volunteerService.delete(volunteer)),
    );

  /**
   * Listen for the GenerateVisitHistoryReport, get visits by date range and organization,
   * then download data as csv.
   * @type {Observable<Visit[]>}
   */
  @Effect({ dispatch: false })
  generateVisitHistoryReport$ = this.actions
    .ofType(SettingsActions.GENERATE_VISIT_HISTORY_REPORT)
    .pipe(
      map((action: SettingsActions.GenerateVisitHistoryReport) => action.payload),
      switchMap(payload => this.visitService
        .getByOrganizationIdAndDateRange(
          payload.organizationId,
          payload.startedAt,
          payload.endedAt,
          true,
        )
        .pipe(
          tap((visits: Visit[]) => {
            this.csvService.downloadAsCsv(
              getVisitsWithVolunteerNames(visits, payload.volunteers), 'VisitHistory.csv', new Map([
                ['name', 'Name'],
                ['startedAt', 'Started At'],
                ['endedAt', 'Ended At'],
                ['duration', 'Duration'],
              ]),
            );
          }),
        )),
    );

  /**
   * Listen for the UpdateOrganization action, update organization,
   * then dispatch an action to root store and display success snack bar.
   */
  @Effect()
  updateOrganization$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_ORGANIZATION)
    .pipe(
      map((action: SettingsActions.UpdateOrganization) => action.payload),
      switchMap((organization: Organization) => this.organizationService.update(organization)
        .pipe(
          map(() => {
            this.snackBarService.updateOrganizationSuccess();
            return new SessionActions.UpdateOrganization(organization);
          }),
        )),
    );

  /**
   * Listen for the updateRole action, update a user's role,
   * then display a success snack bar.
   */
  @Effect({ dispatch: false })
  updateRole$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_ROLE)
    .pipe(
      map((action: SettingsActions.UpdateRole) => action.payload),
      switchMap((user: User) => this.userService.update(user)
        .pipe(
          tap(() => {
            this.snackBarService.updateUserSuccess();
          }),
        )),
    );

  /**
   * Listen for the UpdateUser action, update user,
   * then dispatch SessionActions.UpdateUser and display a success snack bar.
   */
  @Effect()
  updateUser$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_USER)
    .pipe(
      map((action: SettingsActions.UpdateUser) => action.payload),
      switchMap((user: User) => this.authService.updateUser(user)
        .pipe(
          map(() => {
            this.snackBarService.updateUserSuccess();
            return new SessionActions.UpdateUser(user);
          }),
        )),
    );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private csvService: CsvService,
  ) {
  }
}
