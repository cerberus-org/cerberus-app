import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';
import { Visit } from '../models/visit';

export const UPDATE_USER = '[update user] Update user';
export const UPDATE_ORGANIZATION = '[update organization] Update organization';
export const SET_SIDENAV_SELECTION = '[set sidenav selection] Set sidenav selection';
export const LOAD_VISITS_BY_DATE = '[get visits by dates] Get visits by dates';
export const LOAD_VISITS_BY_DATE_SUCCESS = '[get visits by dates success] Get visits by date success';

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

export class LoadVisitsByDate implements Action {
  readonly type = LOAD_VISITS_BY_DATE;

  constructor(public payload: {
    startedAt: Date,
    endedAt: Date,
  }) {}
}

export class LoadVisitsByDateSuccess implements Action {
  readonly type = LOAD_VISITS_BY_DATE_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export type All
  = UpdateUser
  | UpdateOrganization
  | SetSidenavSelection
  | LoadVisitsByDate
  | LoadVisitsByDateSuccess;
