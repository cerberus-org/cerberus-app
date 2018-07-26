import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MemberService } from '../../../data/services/member.service';
import { OrganizationService } from '../../../data/services/organization.service';
import { SiteService } from '../../../data/services/site.service';
import { VisitService } from '../../../data/services/visit.service';
import { VolunteerService } from '../../../data/services/volunteer.service';
import * as ModelActions from '../actions/model.actions';

@Injectable()
export class ModelEffects {

  /**
   * Listen for the LoadSites action, get the sites by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadSites$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_SITES)
    .pipe(
      map((action: ModelActions.LoadSites) => action.payload),
      switchMap(organizationId => this.siteService
        .getByKey('organizationId', organizationId, true)
        .pipe(
          map(sites => new ModelActions.LoadSitesSuccess(sites)),
        )),
    );

  /**
   * Listen for the LoadMembers action, get the members by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadMembers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_MEMBERS)
    .pipe(
      map((action: ModelActions.LoadMembers) => action.payload),
      switchMap(organizationId => this.memberService
        .getByKey('organizationId', organizationId, true)
        .pipe(
          map(members => new ModelActions.LoadMembersSuccess(members)),
        )),
    );

  /**
   * Listen for the LoadVisits action, get the visits by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadVisits$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VISITS)
    .pipe(
      map((action: ModelActions.LoadVisits) => action.payload),
      switchMap(organizationId => this.visitService
        .getByKey('organizationId', organizationId, true)
        .pipe(
          map(visits => new ModelActions.LoadVisitsSuccess(visits)),
        )),
    );

  /**
   * Listen for the LoadVisits action, get the volunteers by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadVolunteers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VOLUNTEERS)
    .pipe(
      map((action: ModelActions.LoadVolunteers) => action.payload),
      switchMap(organizationId => this.volunteerService
        .getByKey('organizationId', organizationId, true)
        .pipe(
          map(volunteers => new ModelActions.LoadVolunteersSuccess(volunteers)),
        )),
    );

  @Effect()
  loadOrganizations$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_ORGANIZATIONS)
    .pipe(
      map((action: ModelActions.LoadOrganizations) => action),
      switchMap(() => this.organizationService
        .getAll(true)
        .pipe(
          map(organizations => new ModelActions.LoadOrganizationsSuccess(organizations)),
        )),
    );

  constructor(
    private actions: Actions,
    private siteService: SiteService,
    private memberService: MemberService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private organizationService: OrganizationService,
  ) {}
}
