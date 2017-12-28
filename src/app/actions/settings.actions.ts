import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const UPDATE_USER = '[update user] Update user';
export const UPDATE_USER_SUCCESS = '[update user succes] Update user success';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor() {}
}

export type All
  = UpdateUser
  | UpdateUserSuccess;
