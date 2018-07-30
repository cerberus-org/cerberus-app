import { Action } from '@ngrx/store';
import { Organization } from '../../shared/models';

export enum TeamsActionTypes {
  LoadOrganizations = '[Teams] Load Organizations',
  LoadOrganizationsSuccess = '[Teams] Load Organizations Success',
}

export class LoadOrganizations implements Action {
  readonly type = TeamsActionTypes.LoadOrganizations;

  constructor() {}
}

export class LoadOrganizationsSuccess implements Action {
  readonly type = TeamsActionTypes.LoadOrganizationsSuccess;

  constructor(payload: Organization[]) {}
}

export type TeamsActionsUnion =
  | LoadOrganizations
  | LoadOrganizationsSuccess;
