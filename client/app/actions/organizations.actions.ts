import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';

export const LOAD = '[Organizations] Load';
export const ADD = '[Organizations] Add';
export const MODIFY = '[Organizations] Modify';

export class LoadOrganizations implements Action {
  readonly type = LOAD;

  constructor(public payload: Organization[]) {}
}

export class AddOrganization implements Action {
  readonly type = ADD;

  constructor(public payload: Organization) {}
}

export class ModifyOrganization implements Action {
  readonly type = MODIFY;

  constructor(public payload: Organization) {}
}

export type All
  = LoadOrganizations
  | AddOrganization
  | ModifyOrganization;
