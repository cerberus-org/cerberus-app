import { Action } from '@ngrx/store';

export const LOG_IN = '[Auth] Log in';
export const LOG_OUT = '[Auth] Log out';
export const VERIFY_PASSWORD = '[Auth] Verify Password';
export const RESET_PASSWORD = '[Auth] Reset Password';

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

export class VerifyPassword implements Action {
  readonly type = VERIFY_PASSWORD;

  constructor(public payload: { email: string, password: string }) {}
}

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;

  constructor(public payload: string) {}
}

export type All
  = LogIn
  | LogOut
  | VerifyPassword
  | ResetPassword;
