import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import * as SessionActions from '../../../auth/store/actions/session.actions';
import { selectSessionOrganization, selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { OrganizationService } from '../../../data/services/organization.service';
import { UserService } from '../../../data/services/user.service';
import { VisitService } from '../../../data/services/visit.service';
import { VolunteerService } from '../../../data/services/volunteer.service';
import { getVisitsWithVolunteerNames } from '../../../functions';
import { SidenavOptions, User, Visit } from '../../../models';
import * as AppActions from '../../../root/store/actions/app.actions';
import { RootState } from '../../../root/store/reducers';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CsvService } from '../../services/csv.service';
import * as SettingsActions from '../actions/settings.actions';
import { selectSettingsSidenavOptions } from '../selectors/settings.selectors';

@Injectable()
export class SettingsEffects {

  /**
   * Sets the sidenav options based on the session user. After dispatch, AppActions.SetSidenavOptions will continue to
   * be dispatched on session user changes.
   * @type {Observable<SetSidenavOptions>}
   */
  @Effect()
  setSidenavOptions$: Observable<Action> = this.actions.ofType(SettingsActions.SET_SETTINGS_SIDENAV_OPTIONS)
    .pipe(
      switchMap(() => this.store$.pipe(select(selectSettingsSidenavOptions))
        .pipe(
          map((sidenavOptions: SidenavOptions[]) => new AppActions.SetSidenavOptions(sidenavOptions)),
        ),
      ),
    );

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
      withLatestFrom(this.store$.pipe(select(selectSessionOrganization))),
      switchMap(([payload, organization]) => this.visitService
        .getByOrganizationIdAndDateRange(
          organization.id,
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
   * Listens for SettingsActions.UpdateOrganization. Applies organization changes against current organization in
   * session, then displays a success snack bar and dispatches SessionActions.UpdateOrganization.
   */
  @Effect()
  updateOrganization$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_ORGANIZATION)
    .pipe(
      map((action: SettingsActions.UpdateOrganization) => action.payload),
      withLatestFrom(this.store$.pipe(select(selectSessionOrganization))),
      switchMap(([organizationEdits, sessionOrganization]) => {
        const editedOrganization = { ...sessionOrganization, ...organizationEdits };
        return this.organizationService.update(editedOrganization)
          .pipe(
            map(() => {
              this.snackBarService.updateOrganizationSuccess();
              return new SessionActions.UpdateOrganization(editedOrganization);
            }),
          );
      }),
    );

  /**
   * Listens for SettingsActions.UpdateUser. Applies user changes against current user in session, then displays a
   * success snack bar and dispatches SessionActions.UpdateUser.
   */
  @Effect()
  updateUser$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_USER)
    .pipe(
      map((action: SettingsActions.UpdateUser) => action.payload),
      withLatestFrom(this.store$.pipe(select(selectSessionUser))),
      switchMap(([userEdits, sessionUser]) => {
        delete userEdits.role;
        const editedUser = { ...sessionUser, ...userEdits };
        return this.authService.updateUser(editedUser)
          .pipe(
            map(() => {
              this.snackBarService.updateUserSuccess();
              return new SessionActions.UpdateUser(editedUser);
            }),
          );
      }),
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

  constructor(
    private store$: Store<RootState>,
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
