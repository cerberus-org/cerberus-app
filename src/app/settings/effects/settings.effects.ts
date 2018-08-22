import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../../core/reducers';
import { getSelectedTeam } from '../../core/selectors/teams.selectors';
import { getVolunteersForSelectedTeam } from '../../core/selectors/volunteers.selectors';
import { MemberService } from '../../core/services/member.service';
import { SiteService } from '../../core/services/site.service';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { TeamService } from '../../core/services/team.service';
import { VisitService } from '../../core/services/visit.service';
import { VolunteerService } from '../../core/services/volunteer.service';
import { Member, Site, Visit } from '../../shared/models';
import {
  CreateSite,
  GenerateReport,
  RemoveMember,
  RemoveSite,
  RemoveVolunteer,
  SettingsActionTypes,
  UpdateRole,
  UpdateSite,
  UpdateTeam,
  UpdateVisit,
} from '../actions/settings.actions';
import { getFormattedVisits } from '../helpers/reports.helpers';
import { CsvService } from '../services/csv.service';

@Injectable()
export class SettingsEffects {

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
  ) {}

  @Effect({ dispatch: false })
  createSite$: Observable<Action | Site> = this.actions.pipe(
    ofType<CreateSite>(SettingsActionTypes.CreateSite),
    map(action => action.payload.site),
    switchMap((site: Site) => this.siteService.add(site).pipe(
      tap(() => {
        this.snackBarService.createSiteSuccess();
      }),
    )),
  );

  @Effect({ dispatch: false })
  removeMember: Observable<Action> = this.actions.pipe(
    ofType<RemoveMember>(SettingsActionTypes.RemoveMember),
    map(action => action.payload.member),
    switchMap(member => this.memberService.remove(member).pipe(
      tap(() => {
        this.snackBarService.removeMemberSuccess();
      }),
    )),
  );

  @Effect({ dispatch: false })
  removeSite$: Observable<Action> = this.actions.pipe(
    ofType<RemoveSite>(SettingsActionTypes.RemoveSite),
    map(action => action.payload.site),
    switchMap(site => this.siteService.remove(site).pipe(
      tap(() => {
        this.snackBarService.removeSiteSuccess();
      }),
    )),
  );

  /**
   * Listen for the deleteVolunteer action then remove the volunteer in the payload.
   */
  @Effect({ dispatch: false })
  removeVolunteer$: Observable<Action> = this.actions.pipe(
    ofType<RemoveVolunteer>(SettingsActionTypes.RemoveVolunteer),
    map(action => action.payload.volunteer),
    switchMap(volunteer => this.volunteerService.remove(volunteer).pipe(
      tap(() => {
        this.snackBarService.removeVolunteerSuccess();
      }),
    )),
  );

  /**
   * Listen for the updateRole action, update a member's role,
   * then display a success snack bar.
   */
  @Effect({ dispatch: false })
  updateRole$: Observable<Action> = this.actions.pipe(
    ofType<UpdateRole>(SettingsActionTypes.UpdateRole),
    map(action => action.payload.member),
    switchMap((member: Member) => this.memberService.update(member).pipe(
      tap(() => {
        this.snackBarService.updateUserSuccess();
      }),
    )),
  );

  @Effect({ dispatch: false })
  updateSite$: Observable<Action> = this.actions.pipe(
    ofType<UpdateSite>(SettingsActionTypes.UpdateSite),
    map(action => action.payload.site),
    switchMap(site => this.siteService.update(site).pipe(
      tap(() => {
        this.snackBarService.updateSiteSuccess();
      }),
    )),
  );

  /**
   * Listens for SettingsActionTypes.SetTeam. Applies team changes against current team in
   * session, then displays a success snack bar and dispatches SessionActions.SetTeam.
   */
  @Effect({ dispatch: false })
  updateTeam$: Observable<Action> = this.actions.pipe(
    ofType<UpdateTeam>(SettingsActionTypes.UpdateTeam),
    map(action => action.payload.team),
    withLatestFrom(this.store$.pipe(select(getSelectedTeam))),
    switchMap(([teamEdits, team]) => {
      const editedTeam = { ...team, ...teamEdits };
      return this.teamService.update(editedTeam).pipe(
        tap(() => {
          this.snackBarService.updateTeamSuccess();
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  updateVisit$: Observable<Action> = this.actions.pipe(
    ofType<UpdateVisit>(SettingsActionTypes.UpdateVisit),
    map(action => action.payload.visit),
    switchMap(visit => this.visitService.update(visit).pipe(
      tap(() => {
        this.snackBarService.updateVisitSuccess();
      }),
    )),
  );

  /**
   * Listen for the GenerateReport, get visits by date range and team,
   * then download data as csv.
   * @type {Observable<Visit[]>}
   */
  @Effect({ dispatch: false })
  generateReport$ = this.actions.pipe(
    ofType<GenerateReport>(SettingsActionTypes.GenerateReport),
    map(action => action.payload),
    withLatestFrom(this.store$.pipe(select(getSelectedTeam))),
    switchMap(([payload, team]) => this.visitService
      .getByTeamIdAndDateRange(
        team.id,
        payload.startedAt,
        payload.endedAt,
        true,
      )
      .pipe(
        withLatestFrom(this.store$.pipe(select(getVolunteersForSelectedTeam))),
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
}
