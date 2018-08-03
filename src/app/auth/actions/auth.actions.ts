import { Action } from '@ngrx/store';
import { Credentials } from '../../shared/models/credentials';

export const SIGN_UP = '[Auth] Sign Up';
export const SIGN_IN = '[Auth] Sign In';
export const SIGN_OUT = '[Auth] Sign Out';
export const VERIFY_PASSWORD = '[Auth] Verify Password';
export const RESET_PASSWORD = '[Auth] Reset Password';

export class SignUp implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: { credentials: Credentials }) {}
}

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
  = SignUp
  | SignIn
  | SignOut
  | VerifyPassword
  | ResetPassword;
