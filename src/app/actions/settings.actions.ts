import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const UPDATE_USER = '[update user] Update user';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export type All
  = UpdateUser;
