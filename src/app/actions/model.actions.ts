import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const LOAD_VISITS = '[Model] Load visits';
export const LOAD_VISITS_SUCCESS = '[Model] Load visits success';

export const LOAD_VOLUNTEERS = '[Model] Load volunteers';
export const LOAD_VOLUNTEERS_SUCCESS = '[Model] Load volunteers success';

export class LoadVisits implements Action {
  readonly type = LOAD_VISITS;

  constructor(public payload: string) {}
}

export class LoadVisitsSuccess implements Action {
  readonly type = LOAD_VISITS_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export class LoadVolunteers implements Action {
  readonly type = LOAD_VOLUNTEERS;

  constructor(public payload: string) {}
}

export class LoadVolunteersSuccess implements Action {
  readonly type = LOAD_VOLUNTEERS_SUCCESS;

  constructor(public payload: Volunteer[]) {}
}

export type All
  = LoadVisits
  | LoadVisitsSuccess
  | LoadVolunteers
  | LoadVolunteersSuccess;
