import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadVolunteers, LoadVolunteersForTeam, VolunteersActionTypes } from '../actions/volunteers.actions';
import { VolunteerService } from '../services/volunteer.service';

@Injectable()
export class VolunteersEffects {

  constructor(
    private actions: Actions,
    private volunteerService: VolunteerService,
  ) {}

  @Effect()
  loadVolunteers$: Observable<Action> = this.actions.pipe(
    ofType<LoadVolunteers>(VolunteersActionTypes.LoadVolunteers),
    switchMap(() => this.volunteerService.getAllChanges()),
  );

  @Effect()
  loadVolunteersForTeam$: Observable<Action> = this.actions.pipe(
    ofType<LoadVolunteersForTeam>(VolunteersActionTypes.LoadVolunteersForTeam),
    map(action => action.payload.teamId),
    switchMap(teamId => this.volunteerService.getChangesByKey('teamId', teamId)),
  );
}
