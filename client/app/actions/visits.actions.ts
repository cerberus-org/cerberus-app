import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const LOAD = '[Visits] Load';
export const ADD = '[Visits] Add';
export const MODIFY = '[Visits] Modify';
export const SELECT_ACTIVE_FOR_VOLUNTEER = '[Visits] Select active for volunteer';

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

export class SelectActiveVisitForVolunteer implements Action {
  readonly type = SELECT_ACTIVE_FOR_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export type All
  = LoadVisits
  | AddVisit
  | ModifyVisit
  | SelectActiveVisitForVolunteer;
