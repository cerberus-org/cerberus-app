import { Action } from '@ngrx/store';
import { HeaderOptions, SidenavOptions } from '../../shared/models';

export enum LayoutActionTypes {
  SetHeaderOptions = '[Layout] Set Header Options',
  SetSidenavOptions = '[Layout] Set Sidenav Options',
  SetSidenavOpened = '[Layout] Set Sidenav Opened',
  ToggleSidenavOpened = '[Layout] Toggle Sidenav Opened',
}

export class SetHeaderOptions implements Action {
  readonly type = LayoutActionTypes.SetHeaderOptions;

  constructor(public payload: { headerOptions: HeaderOptions }) {}
}

export class SetSidenavOptions implements Action {
  readonly type = LayoutActionTypes.SetSidenavOptions;

  constructor(public payload: { sidenavOptions: SidenavOptions[] }) {}
}

export class SetSidenavOpened implements Action {
  readonly type = LayoutActionTypes.SetSidenavOpened;

  constructor(public payload: { sidenavOpened: boolean }) {}
}

export class ToggleSidenavOpened implements Action {
  readonly type = LayoutActionTypes.ToggleSidenavOpened;

  constructor() {}
}

export type LayoutActionsUnion
  = SetHeaderOptions
  | SetSidenavOptions
  | SetSidenavOpened
  | ToggleSidenavOpened;
