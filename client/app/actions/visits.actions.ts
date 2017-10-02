import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const LOAD = '[Visits] Load';
export const ADD = '[Visits] Add';
export const MODIFY = '[Visits] Modify';

export class LoadVisits implements Action {
  readonly type = LOAD;

  constructor(public payload: Visit[]) {}
}

export class AddVisit implements Action {
  readonly type = ADD;

  constructor(public payload: Visit) {}
}

export class ModifyVisit implements Action {
  readonly type = MODIFY;

  constructor(public payload: Visit) {}
}

export type All
  = LoadVisits
  | AddVisit
  | ModifyVisit;
