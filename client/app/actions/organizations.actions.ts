import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';

export const LOAD   = '[Organizations] Load';
export const ADD    = '[Organizations] Add';
export const MODIFY = '[Organizations] Modify';

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Organization[]) {}
}

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: Organization) {}
}

export class ModifyAction implements Action {
  readonly type = MODIFY;

  constructor(public payload: Organization) {}
}

export type Actions
  = LoadAction
  | AddAction
  | ModifyAction;
