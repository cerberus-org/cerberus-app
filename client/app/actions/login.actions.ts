import { Action } from '@ngrx/store';

import { User } from '../models/user';

export const LOGIN = '[login] Login';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: User) {}
}

export type All
  = Login;
