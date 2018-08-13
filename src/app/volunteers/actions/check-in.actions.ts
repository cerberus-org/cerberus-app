import { Action } from '@ngrx/store';
import { Visit, Volunteer } from '../../shared/models';

export enum CheckInActionTypes {
  SubmitNewVolunteer = '[checkIn] submit new volunteer',
  CheckIn = '[checkIn] check in',
  CheckOut = '[checkIn] check out',
}

export class SubmitNewVolunteer implements Action {
  readonly type = CheckInActionTypes.SubmitNewVolunteer;

  constructor(public payload: { volunteer: Volunteer}) {}
}

export class CheckIn implements Action {
  readonly type = CheckInActionTypes.CheckIn;

  constructor(public payload: { visit: Visit }) {}
}

export class CheckOut implements Action {
  readonly type = CheckInActionTypes.CheckOut;

  constructor(public payload: { visit: Visit }) {}
}
