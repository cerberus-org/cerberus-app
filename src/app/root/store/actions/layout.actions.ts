import { Action } from '@ngrx/store';
import { HeaderOptions, SidenavOptions } from '../../../models';

export const SET_HEADER_OPTIONS = '[Layout] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[Layout] Set Sidenav Options';

export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export type All
  = SetHeaderOptions
  | SetSidenavOptions;
