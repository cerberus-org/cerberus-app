import { Action } from '@ngrx/store';
import { Organization } from '../../../models';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';

export const JOIN_ORGANIZATION = '[Join Organization] Join Organization';
export const SET_VALID_MEMBER_AND_USER_INFO = '[Join Organization] Set valid member and user info';
export const SET_VALID_ORGANIZATION = '[Join Organization] Set valid organization';

export class JoinOrganizationActions implements Action {
  readonly type = JOIN_ORGANIZATION;

  constructor() {}
}

export class SetValidMemberAndUserInfo implements Action {
  readonly type = SET_VALID_MEMBER_AND_USER_INFO;

  constructor(public payload: { userFormChanges: UserFormChanges }) {}
}

export class SetValidOrganization implements Action {
  readonly type = SET_VALID_ORGANIZATION;

  constructor(public payload: { organization: Organization }) {}
}

export type All
  = JoinOrganizationActions
  | SetValidMemberAndUserInfo
  | SetValidOrganization;
