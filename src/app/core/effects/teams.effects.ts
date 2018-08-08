import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadTeams, LoadTeamsSuccess, TeamsActionTypes } from '../actions/teams.actions';
import { TeamService } from '../services/team.service';

@Injectable()
export class TeamsEffects {

  constructor(
    private actions: Actions,
    private teamService: TeamService,
  ) {}

  @Effect()
  loadTeams$: Observable<Action> = this.actions.pipe(
    ofType<LoadTeams>(TeamsActionTypes.LoadTeams),
    switchMap(() => this.teamService.getAll(true).pipe(
      map(teams => new LoadTeamsSuccess({ teams })),
    )),
  );
}
