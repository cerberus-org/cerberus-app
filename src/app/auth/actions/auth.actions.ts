import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Credentials } from '../../shared/models/credentials';

export enum AuthActionTypes {
  SignUp = '[Auth] Sign Up',
  SignIn = '[Auth] Sign In',
  SignOut = '[Auth] Sign Out',
  VerifyPassword = '[Auth] Verify Password',
  ResetPassword = '[Auth] Reset Password',
  SetUserInfo = '[Auth] Set User Info',
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SignUp;

  constructor(public payload: { credentials: Credentials }) {}
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;

  constructor(public payload: { credentials: Credentials }) {}
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
}

export class VerifyPassword implements Action {
  readonly type = AuthActionTypes.VerifyPassword;

  constructor(public payload: { password: string }) {}
}

export class ResetPassword implements Action {
  readonly type = AuthActionTypes.ResetPassword;

  constructor(public payload: { email: string }) {}
}

export class SetUserInfo implements Action {
  readonly type = AuthActionTypes.SetUserInfo;

  constructor(public payload: { userInfo: UserInfo }) {}
}

export type AuthActionsUnion
  = SignUp
  | SignIn
  | SignOut
  | VerifyPassword
  | ResetPassword
  | SetUserInfo;
