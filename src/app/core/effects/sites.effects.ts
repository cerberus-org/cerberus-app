import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadSites, LoadSitesForTeam, LoadSitesSuccess, SitesActionTypes } from '../actions/sites.actions';
import { SiteService } from '../services/site.service';

@Injectable()
export class SitesEffects {

  constructor(
    private actions: Actions,
    private siteService: SiteService,
  ) {}

  @Effect()
  loadSites$: Observable<Action> = this.actions.pipe(
    ofType<LoadSites>(SitesActionTypes.LoadSites),
    switchMap(() => this.siteService.getAll(true).pipe(
      map(sites => new LoadSitesSuccess({ sites })),
    )),
  );

  @Effect()
  loadSitesForTeam$: Observable<Action> = this.actions.pipe(
    ofType<LoadSitesForTeam>(SitesActionTypes.LoadSitesForTeam),
    map(action => action.payload.teamId),
    switchMap(teamId => this.siteService.getStateChangesByKey('teamId', teamId)),
  );
}
