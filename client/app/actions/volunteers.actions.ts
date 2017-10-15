import { Action } from '@ngrx/store';
import { Volunteer } from '../models/volunteer';

export const LOAD = '[Volunteers] Load';
export const ADD = '[Volunteers] Add';
export const MODIFY = '[Volunteers] Modify';

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Volunteer[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Volunteer) {}
}

export class Modify implements Action {
  readonly type = MODIFY;

  constructor(public payload: Volunteer) {}
}

export type All
  = Load
  | Add
  | Modify;
