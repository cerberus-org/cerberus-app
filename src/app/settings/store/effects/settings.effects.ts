import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import * as SessionActions from '../../../auth/store/actions/session.actions';
import { selectSessionOrganization } from '../../../auth/store/selectors/session.selectors';
import { MemberService } from '../../../data/services/member.service';
import { OrganizationService } from '../../../data/services/organization.service';
import { VisitService } from '../../../data/services/visit.service';
import { VolunteerService } from '../../../data/services/volunteer.service';
import { getFormattedVisits } from '../../../shared/helpers';
import { Member, Visit } from '../../../shared/models';
import { RootState } from '../../../core/store/reducers';
import { selectModelVolunteers } from '../../../core/store/selectors/model.selectors';
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
      withLatestFrom(this.store$.pipe(select(selectSessionOrganization))),
      switchMap(([payload, organization]) => this.visitService
        .getByOrganizationIdAndDateRange(
          organization.id,
          payload.startedAt,
          payload.endedAt,
          true,
        )
        .pipe(
          withLatestFrom(this.store$.pipe(select(selectModelVolunteers))),
          tap(([visits, volunteers]) => {
            this.csvService.downloadAsCsv(
              getFormattedVisits(visits, volunteers), 'VisitHistory.csv', new Map([
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
   * Listens for SettingsActions.SetOrganization. Applies organization changes against current organization in
   * session, then displays a success snack bar and dispatches SessionActions.SetOrganization.
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
              return new SessionActions.SetOrganization(editedOrganization);
            }),
          );
      }),
    );

  /**
   * Listens for SettingsActions.SetMemberAndUserInfo. Applies user changes against current user in session, then
   * displays a success snack bar and dispatches SessionActions.SetMemberAndUserInfo.
   */
  @Effect()
  updateUser$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_USER)
    .pipe(
      map((action: SettingsActions.UpdateUser) => action.payload),
      switchMap(({ credentials, member }) => forkJoin(
        this.authService.updateUser(credentials),
        this.memberService.update(member),
      )
        .pipe(
          map(([userInfo]) => {
            this.snackBarService.updateUserSuccess();
            return new SessionActions.SetMemberAndUserInfo({ member, userInfo });
          }),
        )),
    );

  /**
   * Listen for the updateRole action, update a member's role,
   * then display a success snack bar.
   */
  @Effect({ dispatch: false })
  updateRole$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_ROLE)
    .pipe(
      map((action: SettingsActions.UpdateRole) => action.payload),
      switchMap((member: Member) => this.memberService.update(member)
        .pipe(
          tap(() => {
            this.snackBarService.updateUserSuccess();
          }),
        )),
    );

  /**
   * Listen for updateVisits action, update visits,
   * then display a success snack bar.
   *
   * @type {Observable<any>}
   */
  @Effect({ dispatch: false })
  updateVisits$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_VISITS)
    .pipe(
      map((action: SettingsActions.UpdateVisits) => action.payload),
      switchMap(visits => this.visitService.batchUpdate(visits)
        .pipe(
          tap(() => {
            this.snackBarService.updateVisitsSuccess();
          }),
        )),
    );

  constructor(
    private store$: Store<RootState>,
    private actions: Actions,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private snackBarService: SnackBarService,
    private memberService: MemberService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private csvService: CsvService,
  ) {
  }
}
