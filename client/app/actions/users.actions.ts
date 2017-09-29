import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const LOAD   = '[Users] Load';
export const ADD    = '[Users] Add';
export const MODIFY = '[Users] Modify';

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: User[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: User) {}
}

export class Modfiy implements Action {
  readonly type = MODIFY;

  constructor(public payload: User) {}
}

export type All
  = Load
  | Add
  | Modfiy;
