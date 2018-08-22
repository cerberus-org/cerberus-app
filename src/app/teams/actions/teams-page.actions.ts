import { Action } from '@ngrx/store';
import { Member, Team } from '../../shared/models';

export enum TeamsPageActionTypes {
  CancelRequest = '[teams page] cancel request',
  CreateTeam = '[teams page] create team',
  JoinTeam = '[teams page] join team',
  OpenCreateTeamDialog = '[teams page] open create team dialog',
  OpenJoinTeamDialog = '[teams page] open join team dialog',
}

export class CancelRequest implements Action {
  readonly type = TeamsPageActionTypes.CancelRequest;

  constructor(public payload: { member: Member }) {}
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
