import { Action } from '@ngrx/store';

export const LOGIN = '[login] Login';
export const LOGOUT = '[login] Logout';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: {
    email: string,
    password: string
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload: any) {}
}

export type All
  = Login
  | Logout;
