import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';


import { Observable } from 'rxjs/index';

import * as ModelActions from '../actions/model.actions';
import { OrganizationService, SiteService, UserService, VisitService, VolunteerService } from '../services';

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
   * Listen for the LoadUsers action, get the users by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadUsers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_USERS)
    .pipe(
      map((action: ModelActions.LoadUsers) => action.payload),
      switchMap(organizationId => this.userService
        .getByKey('organizationId', organizationId, true)
        .pipe(
          map(users => new ModelActions.LoadUsersSuccess(users)),
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
    private userService: UserService,
    private visitService: VisitService,
    private volunteerService: VolunteerService,
    private organizationService: OrganizationService,
  ) {}
}
