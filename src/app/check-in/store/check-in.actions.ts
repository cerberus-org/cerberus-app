import { Action } from '@ngrx/store';
import { Visit, Volunteer } from '../../models/index';

export const CHECK_IN = '[Check-In] Check in';
export const CHECK_OUT = '[Check-In] Check out';

export const SUBMIT_NEW_VOLUNTEER = '[Check-In] Submit new volunteer';
export const SUBMIT_NEW_VOLUNTEER_SUCCESS = '[Check-In] Submit new volunteer success';

export class CheckIn implements Action {
  readonly type = CHECK_IN;

  constructor(public payload: Visit) {}
}

export class CheckOut implements Action {
  readonly type = CHECK_OUT;

  constructor(public payload: Visit) {}
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
  | SubmitNewVolunteer
  | SubmitNewVolunteerSuccess;
