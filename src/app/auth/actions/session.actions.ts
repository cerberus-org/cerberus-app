import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';

export const CLEAR_DATA = '[Session] Clear Data';
export const SET_USER_INFO = '[Session] Set User Info';

export class SetUserInfo implements Action {
  readonly type = SET_USER_INFO;

  constructor(public payload: { userInfo: UserInfo }) {}
}

/**
 * Clears all session data.
 */
export class ClearData implements Action {
  readonly type = CLEAR_DATA;

  constructor() {}
}

export type All
  = ClearData
  | SetUserInfo;
