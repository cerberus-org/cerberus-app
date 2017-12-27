import { Action } from '@ngrx/store';
import { HeaderOptions } from '../models/header-options';
import { SidenavOptions } from '../models/sidenav-options';

export const SET_HEADER_OPTIONS = '[App] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[App] Set Sidenav Options';

/**
 * Includes side nav options and header options.
 */
export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

/**
 * Includes side nav options and header options.
 */
export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export type All
  = SetHeaderOptions
  | SetSidenavOptions;
