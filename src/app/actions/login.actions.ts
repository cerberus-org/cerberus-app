import { Action } from '@ngrx/store';

export const LOG_IN = '[Login] Log in';
export const LOG_OUT = '[Login] Log out';
export const VERIFY = '[Login] Verify';
export const RESET_PASSWORD = '[Login] Reset';

export class LogIn implements Action {
  readonly type = LOG_IN;

  constructor(public payload: {
    email: string,
    password: string,
  }) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class Verify implements Action {
  readonly type = VERIFY;

  constructor(public payload: { email: string, password: string }) {}
}

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;

  constructor(public payload: string) {}
}

export type All
  = LogIn
  | LogOut
  | Verify
  | ResetPassword;
