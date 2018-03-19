import { Action } from '@ngrx/store';

import { Site, User, Visit, Volunteer } from '../models';

export const LOAD_SITES = '[Model] Load sites';
export const LOAD_SITES_SUCCESS = '[Model] Load sites success';

export const LOAD_USERS = '[Model] Load users';
export const LOAD_USERS_SUCCESS = '[Model] Load users success';

export const LOAD_VISITS = '[Model] Load visits';
export const LOAD_VISITS_SUCCESS = '[Model] Load visits success';

export const LOAD_VOLUNTEERS = '[Model] Load volunteers';
export const LOAD_VOLUNTEERS_SUCCESS = '[Model] Load volunteers success';

export class LoadSites implements Action {
  readonly type = LOAD_SITES;

  constructor(public payload: string) {}
}

export class LoadSitesSuccess implements Action {
  readonly type = LOAD_SITES_SUCCESS;

  constructor(public payload: Site[]) {}
}

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor(public payload: string) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {}
}

export class LoadVisits implements Action {
  readonly type = LOAD_VISITS;

  constructor(public payload: string) {}
}

export class LoadVisitsSuccess implements Action {
  readonly type = LOAD_VISITS_SUCCESS;

  constructor(public payload: Visit[]) {}
}

export class LoadVolunteers implements Action {
  readonly type = LOAD_VOLUNTEERS;

  constructor(public payload: string) {}
}

export class LoadVolunteersSuccess implements Action {
  readonly type = LOAD_VOLUNTEERS_SUCCESS;

  constructor(public payload: Volunteer[]) {}
}

export type All
  = LoadSites
  | LoadSitesSuccess
  | LoadUsers
  | LoadUsersSuccess
  | LoadVisits
  | LoadVisitsSuccess
  | LoadVolunteers
  | LoadVolunteersSuccess;
