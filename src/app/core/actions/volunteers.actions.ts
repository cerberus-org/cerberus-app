import { Action } from '@ngrx/store';
import { Volunteer } from '../../shared/models';

export enum VolunteersActionTypes {
  LoadVolunteers = '[volunteers] load volunteers',
  LoadVolunteersForTeam = '[volunteers] load volunteers for team',
  VolunteerAdded = '[volunteers] added',
  VolunteerModified = '[volunteers] modified',
  VolunteerRemoved = '[volunteers] removed',
}

export class LoadVolunteers implements Action {
  readonly type = VolunteersActionTypes.LoadVolunteers;
}

export class LoadVolunteersForTeam implements Action {
  readonly type = VolunteersActionTypes.LoadVolunteersForTeam;

  constructor(public payload: { teamId: string }) {}
}

// AngularFire2 StateChanges

export class VolunteerAdded implements Action {
  readonly type = VolunteersActionTypes.VolunteerAdded;

  constructor(public payload: Volunteer) {}
}

export class VolunteerModified implements Action {
  readonly type = VolunteersActionTypes.VolunteerModified;

  constructor(public payload: Volunteer) {}
}

export class VolunteerRemoved implements Action {
  readonly type = VolunteersActionTypes.VolunteerRemoved;

  constructor(public payload: Volunteer) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type VolunteersActionsUnion =
  | LoadVolunteers
  | LoadVolunteersForTeam
  | VolunteerAdded
  | VolunteerModified
  | VolunteerRemoved;
