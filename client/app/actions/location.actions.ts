import { Action } from '@ngrx/store';
import { Location } from '../models/location';

export const LOAD   = '[Locations] Load';
export const ADD    = '[Locations] Add';
export const MODIFY = '[Locations] Modify';

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

export type All = Load | Add | Modify;
