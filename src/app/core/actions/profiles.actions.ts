import { Action } from '@ngrx/store';
import { Profile } from '../../shared/models';

export enum ProfilesActionTypes {
  LoadProfiles = '[profiles] load profiles',
  LoadProfilesForTeam = '[profiles] load profiles for team',
  ProfileAdded = '[profiles] added',
  ProfileModified = '[profiles] modified',
  ProfileRemoved = '[profiles] removed',
}

export class LoadProfiles implements Action {
  readonly type = ProfilesActionTypes.LoadProfiles;
}

export class LoadProfilesForTeam implements Action {
  readonly type = ProfilesActionTypes.LoadProfilesForTeam;

  constructor(public payload: { teamId: string }) {}
}

// AngularFire2 StateChanges

export class ProfileAdded implements Action {
  readonly type = ProfilesActionTypes.ProfileAdded;

  constructor(public payload: Profile) {}
}

export class ProfileModified implements Action {
  readonly type = ProfilesActionTypes.ProfileModified;

  constructor(public payload: Profile) {}
}

export class ProfileRemoved implements Action {
  readonly type = ProfilesActionTypes.ProfileRemoved;

  constructor(public payload: Profile) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProfilesActionsUnion =
  | LoadProfiles
  | LoadProfilesForTeam
  | ProfileAdded
  | ProfileModified
  | ProfileRemoved;
