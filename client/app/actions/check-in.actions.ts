import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const LOAD_DATA = '[Data Display] Load data';
export const LOAD_DATA_SUCCESS = '[Data Display] Load data success';
export const FILTER_AND_SELECT_VOLUNTEERS_BY_NAME = '[Volunteers] Filter and select volunteers by name 👱';
export const SELECT_VOLUNTEER_BY_PET_NAME = '[Volunteers] Select volunteer by petName 🐶';
export const SELECT_ACTIVE_VISIT_FOR_VOLUNTEER = '[Visits] Select active visit for volunteer';

export class LoadData implements Action {
  readonly type = LOAD_DATA;

  constructor(public payload: {
    organizationId: string,
    siteId: string
  }) {}
}

export class LoadDataSuccess implements Action {
  readonly type = LOAD_DATA_SUCCESS;

  constructor(public payload: {
    visits: Visit[]
    volunteers: Volunteer[]
  }) {}
}

export class FilterAndSelectVolunteersByName implements Action {
  readonly type = FILTER_AND_SELECT_VOLUNTEERS_BY_NAME;

  constructor(public payload: string) {}
}

export class SelectVolunteerByPetName implements Action {
  readonly type = SELECT_VOLUNTEER_BY_PET_NAME;

  constructor(public payload: string) {}
}

export class SelectActiveVisitForVolunteer implements Action {
  readonly type = SELECT_ACTIVE_VISIT_FOR_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export type All
  = LoadData
  | LoadDataSuccess
  | FilterAndSelectVolunteersByName
  | SelectVolunteerByPetName
  | SelectActiveVisitForVolunteer;
