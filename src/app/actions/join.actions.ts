import { Action } from '@ngrx/store';
import {Organization} from '../models/organization';

export const LOAD_DATA = '[Load data] Load data';
export const LOAD_DATA_SUCCESS = '[Load data success] Load data success';

export class LoadData implements Action {
  readonly type = LOAD_DATA;
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: Organization[]) {}
}

export type All
  = LoadData
  | LoadDataSuccess;
