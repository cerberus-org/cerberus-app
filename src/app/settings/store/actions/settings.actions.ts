import { Action } from '@ngrx/store';
import { UserFormChanges } from '../../../shared/components/user-form/user-form.component';
import { Organization, Member, Visit, Volunteer } from '../../../models';

export const DELETE_VOLUNTEER = '[Settings] Delete volunteer';
export const DELETE_VOLUNTEER_SUCCESS = '[Settings] Delete volunteer success';
export const GENERATE_VISIT_HISTORY_REPORT = '[Settings] Generate visit history report';
export const LOAD_PAGE = '[Settings] Load page';
export const LOAD_VOLUNTEERS_PAGE = '[Settings] Load volunteers page';
export const LOAD_VOLUNTEERS_PAGE_SUCCESS = '[Settings] Load volunteers page success';
export const SET_SETTINGS_SIDENAV_OPTIONS = '[Settings] Set settings sidenav options';
export const UPDATE_ROLE = '[Settings] Update role';
export const UPDATE_ORGANIZATION = '[Settings] Update organization';
export const UPDATE_USER = '[Settings] Update user';
export const UPDATE_VISITS = '[Settings] Update visits';

export class DeleteVolunteer implements Action {
  readonly type = DELETE_VOLUNTEER;

  constructor(public payload: Volunteer) {}
}

export class DeleteVolunteerSuccess implements Action {
  readonly type = DELETE_VOLUNTEER_SUCCESS;

  constructor(public payload: Volunteer) {}
}

export class GenerateVisitHistoryReport implements Action {
  readonly type = GENERATE_VISIT_HISTORY_REPORT;

  constructor(public payload: {
    startedAt: Date,
    endedAt: Date,
  }) {}
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

export class SetSettingsSidenavOptions implements Action {
  readonly type = SET_SETTINGS_SIDENAV_OPTIONS;

  constructor() {}
}

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: UserFormChanges) {}
}

export class UpdateRole implements Action {
  readonly type = UPDATE_ROLE;

  constructor(public payload: Member) {}
}

export class UpdateVisits implements Action {
  readonly type = UPDATE_VISITS;

  constructor(public payload: Visit[]) {}
}

export type All
  = DeleteVolunteer
  | DeleteVolunteerSuccess
  | GenerateVisitHistoryReport
  | LoadPage
  | LoadVolunteersPage
  | LoadVolunteersPageSuccess
  | SetSettingsSidenavOptions
  | UpdateRole
  | UpdateOrganization
  | UpdateUser
  | UpdateVisits;
