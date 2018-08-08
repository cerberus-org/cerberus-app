import { Action } from '@ngrx/store';
import { HeaderOptions, SidenavOptions } from '../../shared/models';

export enum LayoutActionTypes {
  SetHeaderOptions = '[layout] set header options',
  SetSidenavOptions = '[layout] set sidenav options',
  SetSidenavOpened = '[layout] set sidenav opened',
  ToggleSidenavOpened = '[layout] toggle sidenav opened',
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
