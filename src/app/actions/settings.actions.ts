import { Action } from '@ngrx/store';
import {Organization, User, Visit, Volunteer} from '../models';

export const DELETE_VOLUNTEER = '[Settings] Delete volunteer';
export const DELETE_VOLUNTEER_SUCCESS = '[Settings] Delete volunteer success';
export const GENERATE_VISIT_HISTORY_REPORT = '[Settings] Generate visit history report';
export const LOAD_PAGE = '[Settings] Load page';
export const LOAD_VOLUNTEERS_PAGE = '[Settings] Load volunteers page';
export const LOAD_VOLUNTEERS_PAGE_SUCCESS = '[Settings] Load volunteers page success';
export const UPDATE_ROLE = '[Settings] Update role';
export const UPDATE_ORGANIZATION = '[Settings] Update organization';
export const UPDATE_USER = '[Settings] Update user';
export const UPDATE_VISIT = '[Settings] Update visit';

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

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateVisit implements Action {
  readonly type = UPDATE_VISIT;

  constructor(public payload: Visit) {}
}

export class UpdateRole implements Action {
  readonly type = UPDATE_ROLE;

  constructor(public payload: User) {}
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
  | GenerateVisitHistoryReport
  | LoadPage
  | LoadVolunteersPage
  | LoadVolunteersPageSuccess
  | UpdateRole
  | UpdateOrganization
  | UpdateUser;
