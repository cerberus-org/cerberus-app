import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const LOAD_DATA = '[Check-In] Load data';
export const LOAD_DATA_SUCCESS = '[Check-In] Load data success';
export const SUBMIT_NEW_VOLUNTEER = '[Check-In] Submit new volunteer';
export const SUBMIT_NEW_VOLUNTEER_SUCCESS = '[Check-In] Submit new volunteer success';
export const CHECK_IN = '[Check-In] Check in';
export const CHECK_OUT = '[Check-In] Check out';
export const FILTER_AND_SELECT_VOLUNTEERS_BY_NAME = '[Check-In] Filter and select volunteers by name 👱';
export const SELECT_VOLUNTEER_BY_PET_NAME = '[Check-In] Select volunteer by petName 🐶';
export const SELECT_ACTIVE_VISIT_FOR_VOLUNTEER = '[Check-In] Select active visit for volunteer';

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

export class SubmitNewVolunteer implements Action {
  readonly type = SUBMIT_NEW_VOLUNTEER;

  constructor(public payload: {
    organizationId: string,
    siteId: string
  }) {}
}

export class SubmitNewVolunteerSuccess implements Action {
  readonly type = SUBMIT_NEW_VOLUNTEER_SUCCESS;

  constructor(public payload: Volunteer) {}
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
  | SubmitNewVolunteer
  | SubmitNewVolunteerSuccess
  | FilterAndSelectVolunteersByName
  | SelectVolunteerByPetName
  | SelectActiveVisitForVolunteer;
