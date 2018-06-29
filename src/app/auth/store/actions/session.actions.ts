import { Action } from '@ngrx/store';
import { User } from 'firebase';
import { Member, Organization } from '../../../models';

export const CLEAR_DATA = '[Session] Clear data';
export const LOAD_DATA = '[Session] Load data';
export const LOAD_DATA_SUCCESS = '[Session] Load data success';
export const SET_ORGANIZATION = '[Session] Set validOrganization';
export const SET_USER = '[Session] Set user';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: User) {}
}

/**
 * Sets the session data when the user logs in.
 */
export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: {
    member: Member,
    organization: Organization,
    user: User,
  }) {}
}

/**
 * Sets the session validOrganization.
 */
export class SetOrganization implements Action {
  readonly type = SET_ORGANIZATION;

  constructor(public payload: Organization) {}
}

/**
 * Sets the session user.
 */
export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: { member: Member, user: User }) {}
}

/**
 * Clears all session data.
 */
export class ClearData implements Action {
  readonly type = CLEAR_DATA;

  constructor() {}
}

export type All
  = ClearData
  | LoadData
  | LoadDataSuccess
  | SetOrganization
  | SetUser;
