import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';
import { Volunteer } from '../models/volunteer';

export const DELETE_VOLUNTEER = '[Settings] Delete volunteer';
export const DELETE_VOLUNTEER_SUCCESS = '[Settings] Delete volunteer success';
export const LOAD_PAGE = '[Settings] Load page';
export const LOAD_VOLUNTEERS_PAGE = '[Settings] Load volunteers page';
export const LOAD_VOLUNTEERS_PAGE_SUCCESS = '[Settings] Load volunteers page success';
export const UPDATE_USER = '[Settings] Update user';
export const UPDATE_ORGANIZATION = '[Settings] Update organization';
export const GENERATE_VISIT_HISTORY_REPORT = '[Export csv of visit history] Export csv of visit history';

export class DeleteVolunteer implements Action {
  readonly type = DELETE_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export class DeleteVolunteerSuccess implements Action {
  readonly type = DELETE_VOLUNTEER_SUCCESS;

  constructor(public payload: Volunteer) {}
}

export class LoadPage implements Action {
  readonly type = LOAD_PAGE;

  constructor(public payload: string) {}
}

export class LoadVolunteersPage implements Action {
  readonly type = LOAD_VOLUNTEERS_PAGE;

  constructor(public payload: string) {}
}

export class LoadVolunteersPageSuccess implements Action {
  readonly type = LOAD_VOLUNTEERS_PAGE_SUCCESS;

  constructor(public payload: Volunteer[]) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class GenerateVisitHistoryReport implements Action {
  readonly type = GENERATE_VISIT_HISTORY_REPORT;

  constructor(public payload: {
    startedAt: Date,
    endedAt: Date,
    organizationId: string,
    volunteers: Volunteer[],
  }) {}
}

export type All
  = DeleteVolunteer
  | DeleteVolunteerSuccess
  | LoadPage
  | LoadVolunteersPage
  | LoadVolunteersPageSuccess
  | UpdateUser
  | UpdateOrganization
  | GenerateVisitHistoryReport;
