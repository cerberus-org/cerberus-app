import { Action } from '@ngrx/store';
import { Site } from '../models/site';

export const LOAD   = '[Sites] Load';
export const ADD    = '[Sites] Add';
export const MODIFY = '[Sites] Modify';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Site[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Site) {}
}

export class Modify implements Action {
  readonly type = MODIFY;

  constructor(public payload: Site) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types.
 */
export type All
  = Load
  | Add
  | Modify;
