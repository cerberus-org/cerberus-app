import { Action } from '@ngrx/store';
import { HeaderOptions, SidenavOptions } from '../../../models';

export const SET_ENABLE_LOADER = '[App] Set Enable Loader';
export const SET_HEADER_OPTIONS = '[App] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[App] Set Sidenav Options';

export class SetEnableLoader implements Action {
  readonly type = SET_ENABLE_LOADER;

  constructor(public payload: Boolean) {}
}

export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export type All
  = SetEnableLoader
  | SetHeaderOptions
  | SetSidenavOptions;
