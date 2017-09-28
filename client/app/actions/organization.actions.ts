import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';

export const LOAD   = '[Organizations] Load';
export const ADD    = '[Organizations] Add';
export const MODIFY = '[Organizations] Modify';

export class Load implements Action {
  readonly type = LOAD;

  constructor(public payload: Organization[]) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Organization) {}
}

export class Modify implements Action {
  readonly type = MODIFY;

  constructor(public payload: Organization) {}
}

export type All = Load | Add | Modify;
