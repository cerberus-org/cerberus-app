import { Action } from '@ngrx/store';
import { HeaderOptions } from '../models/header-options';
import { Organization } from '../models/organization';
import { SidenavOptions } from '../models/sidenav-options';

export const SET_HEADER_OPTIONS = '[App] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[App] Set Sidenav Options';
export const LOAD_DATA = '[App] Load Data';
export const LOAD_DATA_SUCCESS = '[App] Load Data Success';
export const SET_ORGANIZATION = '[App] Set Organization';
export const SET_USER = '[App] Set User';

export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export class LoadData implements Action {
  readonly type = LOAD_DATA;
  // Accepts afUser
  constructor(public payload: any) {}
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: {
    user: any,
    organization: Organization
  }) {}
}

export class SetOrganization implements Action {
  readonly type = SET_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: any) {}
}

export type All
  = SetHeaderOptions
  | SetSidenavOptions
  | LoadData
  | LoadDataSuccess
  | SetOrganization
  | SetUser;
