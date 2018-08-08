import { Action } from '@ngrx/store';
import { Volunteer } from '../../shared/models';

export enum VolunteersActionTypes {
  LoadVolunteers = '[Volunteers] Load Volunteers',
  LoadVolunteersForTeam = '[Volunteers] Load Volunteers for Team',
  LoadVolunteersSuccess = '[Volunteers] Load Volunteers Success',
}

export class LoadVolunteers implements Action {
  readonly type = VolunteersActionTypes.LoadVolunteers;
}

export class LoadVolunteersForTeam implements Action {
  readonly type = VolunteersActionTypes.LoadVolunteersForTeam;

  constructor(public payload: { teamId: string }) {}
}

export class LoadVolunteersSuccess implements Action {
  readonly type = VolunteersActionTypes.LoadVolunteersSuccess;

  constructor(public payload: { volunteers: Volunteer[] }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type VolunteersActionsUnion =
  | LoadVolunteers
  | LoadVolunteersForTeam
  | LoadVolunteersSuccess;
