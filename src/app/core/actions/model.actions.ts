import { Action } from '@ngrx/store';
import { Member, Organization, Site, Visit, Volunteer } from '../../shared/models/index';

export const LOAD_MEMBERS = '[Model] Load members';
export const LOAD_MEMBERS_SUCCESS = '[Model] Load members success';

export const LOAD_SITES = '[Model] Load sites';
export const LOAD_SITES_SUCCESS = '[Model] Load sites success';

export const LOAD_VISITS = '[Model] Load visits';
export const LOAD_VISITS_SUCCESS = '[Model] Load visits success';

export const LOAD_VOLUNTEERS = '[Model] Load volunteers';
export const LOAD_VOLUNTEERS_SUCCESS = '[Model] Load volunteers success';

export const LOAD_ORGANIZATIONS = '[Model] Load organizations';
export const LOAD_ORGANIZATIONS_SUCCESS = '[Model] Load organizations success';

export class LoadMembers implements Action {
  readonly type = LOAD_MEMBERS;

  constructor(public payload: string) {}
}

export class LoadMembersSuccess implements Action {
  readonly type = LOAD_MEMBERS_SUCCESS;

  constructor(public payload: Member[]) {}
}

export class LoadSites implements Action {
  readonly type = LOAD_SITES;

  constructor(public payload: string) {}
}

export class LoadSitesSuccess implements Action {
  readonly type = LOAD_SITES_SUCCESS;

  constructor(public payload: Site[]) {}
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

export class LoadOrganizations implements Action {
  readonly type = LOAD_ORGANIZATIONS;
}

export class LoadOrganizationsSuccess implements Action {
  readonly type = LOAD_ORGANIZATIONS_SUCCESS;

  constructor(public payload: Organization[]) {}
}

export type All
  = LoadSites
  | LoadSitesSuccess
  | LoadMembers
  | LoadMembersSuccess
  | LoadVisits
  | LoadVisitsSuccess
  | LoadVolunteers
  | LoadVolunteersSuccess
  | LoadOrganizations
  | LoadOrganizationsSuccess;