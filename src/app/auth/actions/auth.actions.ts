import { Action } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Profile } from '../../shared/models';
import { Credentials } from '../../shared/models/credentials';

export enum AuthActionTypes {
  SignUp = '[auth] sign up',
  SignIn = '[auth] sign in',
  SignOut = '[auth] sign out',
  VerifyPassword = '[auth] verify password',
  ResetPassword = '[auth] reset password',
  SetUserInfo = '[auth] set user info',
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SignUp;

  constructor(public payload: { credentials: Credentials, profile: Profile }) {}
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
