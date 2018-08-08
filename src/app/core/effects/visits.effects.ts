import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadVisits, LoadVisitsForTeam, LoadVisitsSuccess, VisitsActionTypes } from '../actions/visits.actions';
import { VisitService } from '../services/visit.service';

@Injectable()
export class VisitsEffects {

  constructor(
    private actions: Actions,
    private visitService: VisitService,
  ) {}

  @Effect()
  loadVisits$: Observable<Action> = this.actions.pipe(
    ofType<LoadVisits>(VisitsActionTypes.LoadVisits),
    switchMap(() => this.visitService.getAll(true).pipe(
      map(visits => new LoadVisitsSuccess({ visits })),
    )),
  );

  @Effect()
  loadVisitsForTeam$: Observable<Action> = this.actions.pipe(
    ofType<LoadVisitsForTeam>(VisitsActionTypes.LoadVisitsForTeam),
    map(action => action.payload.teamId),
    switchMap(teamId => this.visitService.getByKey('organizationId', teamId, true).pipe(
      map(visits => new LoadVisitsSuccess({ visits })),
    )),
  );
}
