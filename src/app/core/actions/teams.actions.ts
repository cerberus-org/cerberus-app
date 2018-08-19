import { Action } from '@ngrx/store';
import { Team } from '../../shared/models';

export enum TeamsActionTypes {
  LoadTeams = '[teams] load teams',
  SelectTeam = '[teams] select team',
  TeamAdded = '[teams] added',
  TeamUpdated = '[teams] updated',
  TeamRemoved = '[teams] removed',
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

export class SelectTeam implements Action {
  readonly type = TeamsActionTypes.SelectTeam;

  constructor(public payload: { teamId: string }) {}
}

// AngularFire2 StateChanges

export class TeamAdded implements Action {
  readonly type = TeamsActionTypes.TeamAdded;

  constructor(public payload: Team) {}
}

export class TeamUpdated implements Action {
  readonly type = TeamsActionTypes.TeamUpdated;

  constructor(public payload: Team) {}
}

export class TeamRemoved implements Action {
  readonly type = TeamsActionTypes.TeamRemoved;

  constructor(public payload: Team) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TeamsActionsUnion =
  | LoadTeams
  | SelectTeam
  | TeamAdded
  | TeamUpdated
  | TeamRemoved;
