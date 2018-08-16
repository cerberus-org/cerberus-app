import { Action } from '@ngrx/store';
import { Profile } from '../../shared/models';

export enum ProfilesActionTypes {
  LoadProfiles = '[profiles] load profiles',
  LoadProfilesByIds = '[profiles] load profiles by ids',
  ProfileAdded = '[profiles] added',
  ProfileModified = '[profiles] modified',
  ProfileRemoved = '[profiles] removed',
}

export class LoadProfiles implements Action {
  readonly type = ProfilesActionTypes.LoadProfiles;
}

export class LoadProfilesByIds implements Action {
  readonly type = ProfilesActionTypes.LoadProfilesByIds;

  constructor(public payload: { ids: string[] }) {}
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
  | LoadProfilesByIds
  | ProfileAdded
  | ProfileModified
  | ProfileRemoved;
