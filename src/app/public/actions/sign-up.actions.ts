import { Action } from '@ngrx/store';
import { UserFormChanges } from '../../shared/components/user-form/user-form.component';
import { Organization } from '../../shared/models';

export const NEXT_STEP = '[Getting Started] Next maxVisitedStep';
export const SET_JOIN_EXISTING_ORGANIZATION = '[Getting Started] Set join existing organization';
export const SET_VALID_ORGANIZATION = '[Getting Started] Set valid organization';
export const SET_VALID_MEMBER_AND_USER_INFO = '[Getting Started] Set valid member and user info';
export const SET_TOS_CHECKED = '[Getting Started] Set TOS checked state';
export const CREATE_ORGANIZATION = '[Getting Started] Create organization';
export const JOIN_ORGANIZATION = '[Getting Started] Join Organization';
export const SUBMIT = '[Getting Started] Submit';

export class NextStep implements Action {
  readonly type = NEXT_STEP;

  constructor(public payload: number) {}
}

export class SetJoinExistingOrganization implements Action {
  readonly type = SET_JOIN_EXISTING_ORGANIZATION;

  constructor(public payload: boolean) {}
}

export class SetValidOrganization implements Action {
  readonly type = SET_VALID_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class SetValidMemberAndUserInfo implements Action {
  readonly type = SET_VALID_MEMBER_AND_USER_INFO;

  constructor(public payload: UserFormChanges) {}
}

export class SetTosChecked implements Action {
  readonly type = SET_TOS_CHECKED;

  constructor(public payload: boolean) {}
}

export class Submit implements Action {
  readonly type = SUBMIT;

  constructor() {}
}

export class CreateOrganization implements Action {
  readonly type = CREATE_ORGANIZATION;

  constructor() {}
}

export class JoinOrganization implements Action {
  readonly type = JOIN_ORGANIZATION;

  constructor() {}
}

export type All
  = NextStep
  | SetJoinExistingOrganization
  | SetValidOrganization
  | SetValidMemberAndUserInfo
  | SetTosChecked
  | Submit
  | CreateOrganization
  | JoinOrganization;
