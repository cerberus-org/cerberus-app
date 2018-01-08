import { Action } from '@ngrx/store';
import { HeaderOptions } from '../models/header-options';
import { SidenavOptions } from '../models/sidenav-options';

export const SET_HEADER_OPTIONS = '[App] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[App] Set Sidenav Options';
export const SET_USER = '[App] Set User';
export const SET_USER_SUCCESS = '[App] Set User Success';

export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export class SetUser implements Action {
  readonly type = SET_USER;

  constructor(public payload: any) {}
}

export class SetUserSuccess implements Action {
  readonly type = SET_USER_SUCCESS;

  constructor(public payload: any) {}
}

export type All
  = SetHeaderOptions
  | SetSidenavOptions
  | SetUser
  | SetUserSuccess;
