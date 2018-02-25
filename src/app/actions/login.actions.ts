import { Action } from '@ngrx/store';

export const LOG_IN = '[login] Log in';
export const LOG_OUT = '[login] Log out';
export const VERIFY = '[login] Verify';

export class LogIn implements Action {
  readonly type = LOG_IN;

  constructor(public payload: {
    email: string,
    password: string
  }) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class Verify implements Action {
  readonly type = VERIFY;

  constructor(public payload: { email: string, password: string }) {}
}

export type All
  = LogIn
  | LogOut
  | Verify;
