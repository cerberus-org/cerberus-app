import { Action } from '@ngrx/store';
import { Organization } from '../../../models';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';

export const NEXT_STEP = '[Getting Started] Next maxVisitedStep';
export const SET_VALID_ORGANIZATION = '[Getting Started] Set valid organization';
export const SET_VALID_MEMBER_AND_USER_INFO = '[Getting Started] Set valid member and user info';
export const SET_TOS_CHECKED = '[Getting Started] Set TOS checked state';
export const SUBMIT = '[Getting Started] Submit';

export class NextStep implements Action {
  readonly type = NEXT_STEP;

  constructor(public payload: number) {}
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

export type All
  = NextStep
  | SetValidOrganization
  | SetValidMemberAndUserInfo
  | SetTosChecked
  | Submit;
