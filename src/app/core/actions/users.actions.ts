import { Action } from '@ngrx/store';
import { User } from '../../shared/models';

export enum UsersActionTypes {
  LoadUsers = '[users] load users',
  LoadUsersByIds = '[users] load users by ids',
  UserAdded = '[users] added',
  UserModified = '[users] modified',
  UserRemoved = '[users] removed',
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
}

export class LoadUsersByIds implements Action {
  readonly type = UsersActionTypes.LoadUsersByIds;

  constructor(public payload: { ids: string[] }) {}
}

// AngularFire2 StateChanges

export class UserAdded implements Action {
  readonly type = UsersActionTypes.UserAdded;

  constructor(public payload: User) {}
}

export class UserModified implements Action {
  readonly type = UsersActionTypes.UserModified;

  constructor(public payload: User) {}
}

export class UserRemoved implements Action {
  readonly type = UsersActionTypes.UserRemoved;

  constructor(public payload: User) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UsersActionsUnion =
  | LoadUsers
  | LoadUsersByIds
  | UserAdded
  | UserModified
  | UserRemoved;
