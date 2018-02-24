import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export const CHECK_IN = '[Check-In] Check in';
export const CHECK_OUT = '[Check-In] Check out';
export const CHECK_IN_OR_OUT_SUCCESS = '[Check-In] Check in or out success';

export const SUBMIT_NEW_VOLUNTEER = '[Check-In] Submit new newVolunteer';
export const SUBMIT_NEW_VOLUNTEER_SUCCESS = '[Check-In] Submit new newVolunteer success';

export class CheckIn implements Action {
  readonly type = CHECK_IN;

  constructor(public payload: Visit) {}
}

export class CheckOut implements Action {
  readonly type = CHECK_OUT;

  constructor(public payload: Visit) {}
}

export class CheckInOrOutSuccess implements Action {
  readonly type = CHECK_IN_OR_OUT_SUCCESS;
}

export class SubmitNewVolunteer implements Action {
  readonly type = SUBMIT_NEW_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export class SubmitNewVolunteerSuccess implements Action {
  readonly type = SUBMIT_NEW_VOLUNTEER_SUCCESS;
}

export type All
  = CheckIn
  | CheckOut
  | CheckInOrOutSuccess
  | SubmitNewVolunteer
  | SubmitNewVolunteerSuccess;
