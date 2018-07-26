import { Action } from '@ngrx/store';
import { HeaderOptions, SidenavOptions } from '../../../models';

export const SET_HEADER_OPTIONS = '[Layout] Set header options';
export const SET_SIDENAV_OPTIONS = '[Layout] Set sidenav options';
export const SET_SIDENAV_OPENED = '[Layout] Set sidenav opened';
export const TOGGLE_SIDENAV_OPENED = '[Layout] Toggle sidenav opened';

export class SetHeaderOptions implements Action {
  readonly type = SET_HEADER_OPTIONS;

  constructor(public payload: HeaderOptions) {}
}

export class SetSidenavOptions implements Action {
  readonly type = SET_SIDENAV_OPTIONS;

  constructor(public payload: SidenavOptions[]) {}
}

export class SetSidenavOpened implements Action {
  readonly type = SET_SIDENAV_OPENED;

  constructor(public payload: boolean) {}
}

export class ToggleSidenavOpened implements Action {
  readonly type = TOGGLE_SIDENAV_OPENED;

  constructor() {}
}

export type All
  = SetHeaderOptions
  | SetSidenavOptions
  | SetSidenavOpened
  | ToggleSidenavOpened;
