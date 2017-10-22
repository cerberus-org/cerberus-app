import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOGIN = '[login] Login';
export const LOGOUT = '[login] Logout';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload: any) {}
}

export type All
  = Login
  | Logout;
