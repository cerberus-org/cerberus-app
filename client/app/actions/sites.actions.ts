import { Action } from '@ngrx/store';
import { Site } from '../models/site';

export const LOAD = '[Sites] Load';
export const ADD = '[Sites] Add';
export const MODIFY = '[Sites] Modify';

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

export type All
  = Load
  | Add
  | Modify;
