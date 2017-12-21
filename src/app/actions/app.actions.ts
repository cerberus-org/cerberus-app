import { Action } from '@ngrx/store';

export const SET_MENU = '[set_menu] Set menu';

export class SetMenu implements Action {
  readonly type = SET_MENU;

  constructor(public payload: any) {}
}

export type All
  = SetMenu;
