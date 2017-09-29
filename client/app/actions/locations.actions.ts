import { Action } from '@ngrx/store';
import { Location } from '../models/location';

export const LOAD   = '[Locations] Load';
export const ADD    = '[Locations] Add';
export const MODIFY = '[Locations] Modify';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Location[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Location) {}
}

export class Modify implements Action {
  readonly type = MODIFY;

  constructor(public payload: Location) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types.
 */
export type All
  = Load
  | Add
  | Modify;
