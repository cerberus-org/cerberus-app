import { Action } from '@ngrx/store';
import { MdTabGroup } from '@angular/material';

import { Organization } from '../models/organization';
import { User } from '../models/user';

export const LOAD_TAB_GROUP = '[Getting Started] Load tab group';
export const NEXT_STEP = '[Getting Started] Next step';
export const UPDATE_VALID_ORGANIZATION = '[Getting Started] Update valid organization';
export const UPDATE_VALID_USER = '[Getting Started] Update valid user';

export class LoadTabGroup implements Action {
  readonly type = LOAD_TAB_GROUP;

  constructor(public payload: MdTabGroup) {}
}

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

export type All
  = LoadTabGroup
  | NextStep
  | UpdateValidOrganization
  | UpdateValidUser;
