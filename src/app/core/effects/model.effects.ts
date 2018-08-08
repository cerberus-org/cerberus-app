import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as ModelActions from '../actions/model.actions';
import { MemberService } from '../services/member.service';
import { SiteService } from '../services/site.service';
import { TeamService } from '../services/team.service';
import { VisitService } from '../services/visit.service';
import { VolunteerService } from '../services/volunteer.service';

@Injectable()
export class ModelEffects {

  /**
   * Listen for the LoadSites action, get the sites by teamId,
   * then dispatch the success action.
   */
  @Effect()
  loadSites$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_SITES)
    .pipe(
      map((action: ModelActions.LoadSites) => action.payload),
      switchMap(teamId => this.siteService
        .getByKey('teamId', teamId, true)
        .pipe(
          map(sites => new ModelActions.LoadSitesSuccess(sites)),
        )),
    );

  /**
   * Listen for the LoadMembers action, get the members by teamId,
   * then dispatch the success action.
   */
  @Effect()
  loadMembers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_MEMBERS)
    .pipe(
      map((action: ModelActions.LoadMembers) => action.payload),
      switchMap(teamId => this.memberService
        .getByKey('teamId', teamId, true)
        .pipe(
          map(members => new ModelActions.LoadMembersSuccess(members)),
        )),
    );

  /**
   * Listen for the LoadVisits action, get the visits by teamId,
   * then dispatch the success action.
   */
  @Effect()
  loadVisits$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VISITS)
    .pipe(
      map((action: ModelActions.LoadVisits) => action.payload),
      switchMap(teamId => this.visitService
        .getByKey('teamId', teamId, true)
        .pipe(
          map(visits => new ModelActions.LoadVisitsSuccess(visits)),
        )),
    );

  /**
   * Listen for the LoadVisits action, get the volunteers by teamId,
   * then dispatch the success action.
   */
  @Effect()
  loadVolunteers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VOLUNTEERS)
    .pipe(
      map((action: ModelActions.LoadVolunteers) => action.payload),
      switchMap(teamId => this.volunteerService
        .getByKey('teamId', teamId, true)
        .pipe(
          map(volunteers => new ModelActions.LoadVolunteersSuccess(volunteers)),
        )),
    );

  @Effect()
  loadTeams$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_TEAMS)
    .pipe(
      map((action: ModelActions.LoadTeams) => action),
      switchMap(() => this.teamService
        .getAll(true)
        .pipe(
          map(teams => new ModelActions.LoadTeamsSuccess(teams)),
        )),
    );

  constructor(
    private actions: Actions,
    private siteService: SiteService,
    private memberService: MemberService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private teamService: TeamService,
  ) {}
}
