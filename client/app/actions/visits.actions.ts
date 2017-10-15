import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const LOAD_SUCCESS = '[Visits] Load Success';
export const LOAD_FOR_ORGANIZATION = '[Visits] Load for organization';
export const ADD = '[Visits] Add';
export const MODIFY = '[Visits] Modify';
export const SELECT_ACTIVE_FOR_VOLUNTEER = '[Visits] Select active for volunteer';

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export class LoadForOrganization implements Action {
  readonly type = LOAD_FOR_ORGANIZATION;

  constructor(public payload: string) {}
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Visit) {}
}

export class Modify implements Action {
  readonly type = MODIFY;

  constructor(public payload: Visit) {}
}

export class SelectActiveForVolunteer implements Action {
  readonly type = SELECT_ACTIVE_FOR_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export type All
  = LoadSuccess
  | LoadForOrganization
  | Add
  | Modify
  | SelectActiveForVolunteer;
