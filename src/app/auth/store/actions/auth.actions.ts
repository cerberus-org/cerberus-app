import { Action } from '@ngrx/store';
import { Credentials } from '../../../models/credentials';

export const SIGN_IN = '[Auth] Sign in';
export const SIGN_OUT = '[Auth] Sign out';
export const VERIFY_PASSWORD = '[Auth] Verify Password';
export const RESET_PASSWORD = '[Auth] Reset Password';

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: Credentials) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class VerifyPassword implements Action {
  readonly type = VERIFY_PASSWORD;

  constructor(public payload: string) {}
}

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;

  constructor(public payload: string) {}
}

export type All
  = SignIn
  | SignOut
  | VerifyPassword
  | ResetPassword;
