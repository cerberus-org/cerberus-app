import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import * as ModelActions from '../actions/model.actions';
import { OrganizationService, SiteService, VisitService, VolunteerService } from '../services';

@Injectable()
export class ModelEffects {

  /**
   * Listen for the LoadSites action, get the sites by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadSites$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_SITES)
    .map((action: ModelActions.LoadSites) => action.payload)
    .switchMap(organizationId => this.siteService
      .getByKey('organizationId', organizationId, true)
      .map(sites => new ModelActions.LoadSitesSuccess(sites)));

  /**
   * Listen for the LoadVisits action, get the visits by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadVisits$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VISITS)
    .map((action: ModelActions.LoadVisits) => action.payload)
    .switchMap(organizationId => this.visitService
      .getByKey('organizationId', organizationId, true)
      .map(visits => new ModelActions.LoadVisitsSuccess(visits)));

  /**
   * Listen for the LoadVisits action, get the volunteers by organizationId,
   * then dispatch the success action.
   */
  @Effect()
  loadVolunteers$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_VOLUNTEERS)
    .map((action: ModelActions.LoadVolunteers) => action.payload)
    .switchMap(organizationId => this.volunteerService
      .getByKey('organizationId', organizationId, true)
      .map(volunteers => new ModelActions.LoadVolunteersSuccess(volunteers)));

  @Effect()
  loadOrganizations$: Observable<Action> = this.actions.ofType(ModelActions.LOAD_ORGANIZATIONS)
    .map((action: ModelActions.LoadOrganizations) => action)
    .switchMap(organizations => this.organizationService
      .getAll()
      .map(organizations => new ModelActions.LoadOrganizationsSuccess(organizations)));

  constructor(private actions: Actions,
              private siteService: SiteService,
              private visitService: VisitService,
              private volunteerService: VolunteerService,
              private organizationService: OrganizationService) {}
}
