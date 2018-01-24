import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';
import { Visit } from '../models/visit';

export const UPDATE_USER = '[update user] Update user';
export const UPDATE_ORGANIZATION = '[update organization] Update organization';
export const SET_SIDENAV_SELECTION = '[set sidenav selection] Set sidenav selection';
export const LOAD_VISITS_BY_DATE_AND_ORGANIZATION = '[get visits by date and organization] Get visits by date and organization';
export const LOAD_VISITS_BY_DATE_AND_ORGANIZATION_SUCCESS = '[get visits by dates success] Get visits by date and organization success';

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {}
}

export class UpdateOrganization implements Action {
  readonly type = UPDATE_ORGANIZATION;

  constructor(public payload: Organization) {}
}

export class SetSidenavSelection implements Action {
  readonly type = SET_SIDENAV_SELECTION;

  constructor(public payload: string) {}
}

export class LoadVisitsByDateAndOrganization implements Action {
  readonly type = LOAD_VISITS_BY_DATE_AND_ORGANIZATION;

  constructor(public payload: {
    startedAt: Date,
    endedAt: Date,
    organizationId: string,
  }) {}
}

export class LoadVisitsByDateAndOrganizationSuccess implements Action {
  readonly type = LOAD_VISITS_BY_DATE_AND_ORGANIZATION_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export type All
  = UpdateUser
  | UpdateOrganization
  | SetSidenavSelection
  | LoadVisitsByDateAndOrganization
  | LoadVisitsByDateAndOrganizationSuccess;
