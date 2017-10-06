import { Action } from '@ngrx/store';
import { Volunteer } from '../models/volunteer';

export const LOAD = '[Volunteers] Load';
export const ADD = '[Volunteers] Add';
export const MODIFY = '[Volunteers] Modify';
export const FILTER_AND_SELECT_BY_NAME = '[Volunteers] Filter and select by name 👱';
export const SELECT_BY_PET_NAME = '[Volunteers] Select by petName 🐶';

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

export class FilterAndSelectByName implements Action {
  readonly type = FILTER_AND_SELECT_BY_NAME;

  constructor(public payload: string) {}
}

export class SelectByPetName implements Action {
  readonly type = SELECT_BY_PET_NAME;

  constructor(public payload: string) {}
}

export type All
  = Load
  | Add
  | Modify
  | FilterAndSelectByName
  | SelectByPetName;
