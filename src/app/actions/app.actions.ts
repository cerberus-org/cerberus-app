import { Action } from '@ngrx/store';
import { User as FbUser } from 'firebase';
import { HeaderOptions } from '../models/header-options';
import { Organization } from '../models/organization';
import { SidenavOptions } from '../models/sidenav-options';
import { User } from '../models/user';

export const SET_HEADER_OPTIONS = '[App] Set Header Options';
export const SET_SIDENAV_OPTIONS = '[App] Set Sidenav Options';

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
