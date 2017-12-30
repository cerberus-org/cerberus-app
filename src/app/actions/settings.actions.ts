import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';

export const UPDATE_USER = '[update user] Update user';
export const UPDATE_ORGANIZATION = '[update organization] Update organization';
export const SET_SIDENAV_SELECTION = '[set sidenav selection] Set sidenav selection';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class SetSidenavSelection implements Action {
  readonly type = SET_SIDENAV_SELECTION;

  constructor(public payload: string) {}
}

export type All
  = UpdateUser
  | UpdateOrganization
  | SetSidenavSelection;
