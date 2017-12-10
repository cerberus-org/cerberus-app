import { Action } from '@ngrx/store';

export const LOG_IN = '[login] Log in';
export const LOG_OUT = '[login] Log out';

export class LogIn implements Action {
  readonly type = LOG_IN;

  constructor(public payload: {
    email: string,
    password: string
  }) {}
}

export class LogOut implements Action {
  readonly type = LOG_OUT;

  constructor(public payload: any) {}
}

export type All
  = LogIn
  | LogOut;
