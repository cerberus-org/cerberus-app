import { Action } from '@ngrx/store';

import { Organization } from '../models/organization';
import { User } from '../models/user';

export const LOAD_DATA = '[App] Load Data';
export const LOAD_DATA_SUCCESS = '[App] Load Data Success';
export const SET_ORGANIZATION = '[App] Set Organization';
export const SET_USER = '[App] Set User';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: FbUser) {}
}

/**
 * Used when user initially logs in.
 */
export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: {
    user: User,
    organization: Organization
  }) {}
}

/**
 * Used when Organization is updated.
 */
export class SetOrganization implements Action {
  readonly type = SET_ORGANIZATION;

  constructor(public payload: Organization) {}
}

/**
 * Used when User is updated.
 */
export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: User) {}
}

export type All
  = LoadData
  | LoadDataSuccess
  | SetOrganization
  | SetUser;
