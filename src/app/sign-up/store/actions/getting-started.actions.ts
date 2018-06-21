import { Action } from '@ngrx/store';
import { Organization, User } from '../../../models';

export const NEXT_STEP = '[Getting Started] Next maxVisitedStep';
export const UPDATE_VALID_ORGANIZATION = '[Getting Started] Update valid organization';
export const UPDATE_VALID_USER = '[Getting Started] Update valid user';
export const UPDATE_TOS_CHECKED = '[Getting Started] Update TOS checked';
export const SUBMIT = '[Getting Started] Submit';

export class NextStep implements Action {
  readonly type = NEXT_STEP;

  constructor(public payload: number) {}
}

export class UpdateValidOrganization implements Action {
  readonly type = UPDATE_VALID_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class UpdateValidUser implements Action {
  readonly type = UPDATE_VALID_USER;

  constructor(public payload: User) {}
}

export class UpdateTosChecked implements Action {
  readonly type = UPDATE_TOS_CHECKED;

  constructor(public payload: boolean) {}
}

export class Submit implements Action {
  readonly type = SUBMIT;

  constructor() {}
}

export type All
  = NextStep
  | UpdateValidOrganization
  | UpdateValidUser
  | UpdateTosChecked
  | Submit;
