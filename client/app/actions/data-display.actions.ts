import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';

export const LOAD_DATA = '[Data Display] Load data';
export const LOAD_DATA_SUCCESS = '[Data Display] Load data success';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: string) {}
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export type All
  = LoadData
  | LoadDataSuccess;
