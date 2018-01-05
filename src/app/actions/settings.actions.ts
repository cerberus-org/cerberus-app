import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';
import { User } from '../models/user';
import { Volunteer } from '../models/volunteer';

export const LOAD_PAGE = '[Settings] Load page';
export const LOAD_VOLUNTEERS_PAGE = '[Settings] Load volunteers page';
export const LOAD_VOLUNTEERS_PAGE_SUCCESS = '[Settings] Load volunteers page success';

export const UPDATE_USER = '[Settings] Update user';
export const UPDATE_ORGANIZATION = '[Settings] Update organization';

export class LoadPage implements Action {
  readonly type = LOAD_PAGE;

  constructor(public payload: string) {}
}

export class LoadVolunteers implements Action {
  readonly type = LOAD_VOLUNTEERS_PAGE;

  constructor(public payload: string) {}
}

export class LoadVolunteersSuccess implements Action {
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

export type All
  = LoadPage
  | LoadVolunteers
  | LoadVolunteersSuccess
  | UpdateUser
  | UpdateOrganization;
