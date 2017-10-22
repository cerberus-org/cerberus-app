import { Action } from '@ngrx/store';

import { Organization } from '../models/organization';
import { User } from '../models/user';

export const NEXT_STEP = '[Getting Started] Next step';
export const UPDATE_VALID_ORGANIZATION = '[Getting Started] Update valid organization';
export const UPDATE_VALID_USER = '[Getting Started] Update valid user';
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

export class Submit implements Action {
  readonly type = SUBMIT;

  constructor(public payload: {
    organization: Organization;
    user: User;
  }) {}
}

export type All
  = NextStep
  | UpdateValidOrganization
  | UpdateValidUser
  | Submit;
