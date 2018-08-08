import { Action } from '@ngrx/store';
import { Team } from '../../shared/models';

export enum TeamsPageActionTypes {
  CreateTeam = '[teams page] create team',
  JoinTeam = '[teams page] join team',
  OpenCreateTeamDialog = '[teams page] open create team dialog',
  OpenJoinTeamDialog = '[teams page] open join team dialog',
}

export class CreateTeam implements Action {
  readonly type = TeamsPageActionTypes.CreateTeam;

  constructor(public payload: { team: Team }) {}
}

export class JoinTeam implements Action {
  readonly type = TeamsPageActionTypes.JoinTeam;

  constructor(public payload: { team: Team }) {}
}

export class OpenCreateTeamDialog implements Action {
  readonly type = TeamsPageActionTypes.OpenCreateTeamDialog;
}

export class OpenJoinTeamDialog implements Action {
  readonly type = TeamsPageActionTypes.OpenJoinTeamDialog;
}
