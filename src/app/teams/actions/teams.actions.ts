import { Action } from '@ngrx/store';
import { Organization } from '../../shared/models';

export enum TeamsActionTypes {
  LoadTeams = '[Teams] Load Teams',
  LoadTeamsSuccess = '[Teams] Load Teams Success',
  CreateTeam = '[Teams] Create Team',
  JoinTeam = '[Teams] Join Team',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadTeams implements Action {
  readonly type = TeamsActionTypes.LoadTeams;

  constructor() {}
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamsActionTypes.LoadTeamsSuccess;

  constructor(public payload: { teams: Organization[] }) {}
}

export class CreateTeam implements Action {
  readonly type = TeamsActionTypes.CreateTeam;

  constructor(public payload: { team: Organization }) {}
}

export class JoinTeam implements Action {
  readonly type = TeamsActionTypes.JoinTeam;

  constructor(public payload: { team: Organization }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TeamsActionsUnion =
  | LoadTeams
  | LoadTeamsSuccess
  | CreateTeam
  | JoinTeam;
