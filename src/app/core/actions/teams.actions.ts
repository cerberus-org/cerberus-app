import { Action } from '@ngrx/store';
import { Team } from '../../shared/models';

export enum TeamsActionTypes {
  LoadTeams = '[Teams] Load Teams',
  LoadTeamsSuccess = '[Teams] Load Teams Success',
  SelectTeam = '[Teams] Select Team',
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
}

export class LoadTeamsSuccess implements Action {
  readonly type = TeamsActionTypes.LoadTeamsSuccess;

  constructor(public payload: { teams: Team[] }) {}
}

export class SelectTeam implements Action {
  readonly type = TeamsActionTypes.SelectTeam;

  constructor(public payload: { teamId: string }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TeamsActionsUnion =
  | LoadTeams
  | LoadTeamsSuccess
  | SelectTeam;
