import { Action } from '@ngrx/store';
import { UserFormChanges } from '../../shared/components/user-form/user-form.component';
import { Member, Site, Team, Visit, Volunteer } from '../../shared/models';

export const DELETE_VOLUNTEER = '[Settings] Delete volunteer';
export const DELETE_VOLUNTEER_SUCCESS = '[Settings] Delete volunteer success';
export const DELETE_SITE = '[Settings] Delete site';

export const GENERATE_VISIT_HISTORY_REPORT = '[Settings] Generate visit history report';

export const LOAD_PAGE = '[Settings] Load page';

export const UPDATE_ROLE = '[Settings] Update role';
export const UPDATE_TEAM = '[Settings] Update team';
export const UPDATE_USER = '[Settings] Update user';
export const UPDATE_VISITS = '[Settings] Update visits';
export const UPDATE_VISIT = '[Settings] Update visit';
export const UPDATE_SITE = '[Settings] Update site';

export const CREATE_SITE = '[Settings] Create site';

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

export class UpdateTeam implements Action {
  readonly type = UPDATE_TEAM;

  constructor(public payload: Team) {}
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

export class CreateSite implements Action {
  readonly type = CREATE_SITE;

  constructor(public payload: Site) {}
}

export class DeleteSite implements Action {
  readonly type = DELETE_SITE;

  constructor(public payload: Site) {}
}

export class UpdateSite implements Action {
  readonly type = UPDATE_SITE;

  constructor(public payload: Site) {}
}

export class UpdateVisit implements Action {
  readonly type = UPDATE_VISIT;

  constructor(public payload: Visit) {}
}

export type All
  = DeleteVolunteer
  | DeleteVolunteerSuccess
  | GenerateVisitHistoryReport
  | LoadPage
  | UpdateRole
  | UpdateTeam
  | UpdateUser
  | UpdateVisits
  | CreateSite
  | DeleteSite
  | UpdateVisit;
