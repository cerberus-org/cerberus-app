import { Action } from '@ngrx/store';

export const LOG_IN = '[Login] Log in';
export const LOG_OUT = '[Login] Log out';
export const VERIFY_PASSWORD = '[Login] Verify Password';
export const RESET_PASSWORD = '[Login] Reset Password';

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
