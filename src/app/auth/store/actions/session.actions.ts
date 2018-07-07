import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Member, Organization } from '../../../models';

export const CLEAR_DATA = '[Session] Clear data';
export const LOAD_DATA = '[Session] Load data';
export const LOAD_DATA_SUCCESS = '[Session] Load data success';
export const SET_ORGANIZATION = '[Session] Set organization';
export const SET_MEMBER_AND_USER_INFO = '[Session] Set userInfo';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: UserInfo) {}
}

/**
 * Sets the session data when the userInfo logs in.
 */
export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: {
    member: Member,
    organization: Organization,
    userInfo: UserInfo,
  }) {}
}

/**
 * Sets the session organization.
 */
export class SetOrganization implements Action {
  readonly type = SET_ORGANIZATION;

  constructor(public payload: Organization) {}
}

/**
 * Sets the session member and userInfo.
 */
export class SetMemberAndUserInfo implements Action {
  readonly type = SET_MEMBER_AND_USER_INFO;

  constructor(public payload: { member: Member, userInfo: UserInfo }) {}
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
  | SetMemberAndUserInfo;
