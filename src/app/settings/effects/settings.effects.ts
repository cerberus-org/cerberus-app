import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../../core/reducers';
import { getSelectedTeam, selectModelVolunteers } from '../../core/selectors/model.selectors';
import { MemberService } from '../../core/services/member.service';
import { TeamService } from '../../core/services/team.service';
import { SiteService } from '../../core/services/site.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { VisitService } from '../../core/services/visit.service';
import { VolunteerService } from '../../core/services/volunteer.service';
import { getFormattedVisits } from '../../shared/helpers';
import { Member, Site, Visit } from '../../shared/models';
import * as SettingsActions from '../actions/settings.actions';
import { CsvService } from '../services/csv.service';

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
   * Listen for the GenerateVisitHistoryReport, get visits by date range and team,
   * then download data as csv.
   * @type {Observable<Visit[]>}
   */
  @Effect({ dispatch: false })
  generateVisitHistoryReport$ = this.actions
    .ofType(SettingsActions.GENERATE_VISIT_HISTORY_REPORT)
    .pipe(
      map((action: SettingsActions.GenerateVisitHistoryReport) => action.payload),
      withLatestFrom(this.store$.pipe(select(getSelectedTeam))),
      switchMap(([payload, team]) => this.visitService
        .getByTeamIdAndDateRange(
          team.id,
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
   * Listens for SettingsActions.SetTeam. Applies team changes against current team in
   * session, then displays a success snack bar and dispatches SessionActions.SetTeam.
   */
  @Effect({ dispatch: false })
  updateTeam$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_TEAM)
    .pipe(
      map((action: SettingsActions.UpdateTeam) => action.payload),
      withLatestFrom(this.store$.pipe(select(getSelectedTeam))),
      switchMap(([teamEdits, sessionTeam]) => {
        const editedTeam = { ...sessionTeam, ...teamEdits };
        return this.teamService.update(editedTeam)
          .pipe(
            tap(() => {
              this.snackBarService.updateTeamSuccess();
            }),
          );
      }),
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

  @Effect({ dispatch: false })
  createSite$: Observable<Action | Site> = this.actions.ofType(SettingsActions.CREATE_SITE)
    .pipe(
      map((action: SettingsActions.CreateSite) => action.payload),
      switchMap((site: Site) => this.siteService.add(site)
        .pipe(
          tap(() => {
            this.snackBarService.createSiteSuccess();
          }),
        )),
    );

  @Effect({ dispatch: false })
  deleteSite$: Observable<Action> = this.actions.ofType(SettingsActions.DELETE_SITE)
    .pipe(
      map((action: SettingsActions.DeleteSite) => action.payload),
      switchMap(site => this.siteService.delete(site)),
    );

  @Effect({ dispatch: false })
  updateSite$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_SITE)
    .pipe(
      map((action: SettingsActions.UpdateSite) => action.payload),
      switchMap(site => this.siteService.update(site)
        .pipe(
          tap(() => {
            this.snackBarService.updateSiteSuccess();
          }),
        )),
    );

  @Effect({ dispatch: false })
  updateVisit$: Observable<Action> = this.actions.ofType(SettingsActions.UPDATE_VISIT)
    .pipe(
      map((action: SettingsActions.UpdateVisit) => action.payload),
      switchMap(visit => this.visitService.update(visit)
        .pipe(
          tap(() => {
            this.snackBarService.updateVisitSuccess();
          }),
        )),
    );

  constructor(
    private store$: Store<AppState>,
    private actions: Actions,
    private authService: AuthService,
    private teamService: TeamService,
    private snackBarService: SnackBarService,
    private memberService: MemberService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private csvService: CsvService,
    private siteService: SiteService,
  ) {
  }
}
