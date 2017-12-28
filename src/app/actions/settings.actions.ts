import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';

export const UPDATE_USER = '[update user] Update user';
export const UPDATE_USER_SUCCESS = '[update user succes] Update user success';
export const UPDATE_ORGANIZATION = '[update organization] Update organization';
export const UPDATE_ORGANIZATION_SUCCESS = '[update organization success] Update organization success';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor() {}
}

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class UpdateOrganizationSuccess implements Action {
  readonly type = UPDATE_ORGANIZATION_SUCCESS;

  constructor() {}
}

export type All
  = UpdateUser
  | UpdateUserSuccess
  | UpdateOrganization
  | UpdateOrganizationSuccess;
