import { Action } from '@ngrx/store';
import { Member, Site, Team, Visit, Volunteer } from '../../shared/models';

export enum SettingsActionTypes {
  SelectSettingsOption = '[settings] select settings option',
  CreateSite = '[settings] create site',
  UpdateSite = '[settings] update site',
  DeleteSite = '[settings] delete site',
  UpdateRole = '[settings] update role',
  UpdateTeam = '[settings] update team',
  UpdateVisit = '[settings] update visit',
  DeleteVolunteer = '[settings] delete volunteer',
  GenerateReport = '[settings] generate report',
}

export class SelectSettingsOption implements Action {
  readonly type = SettingsActionTypes.SelectSettingsOption;

  constructor(public payload: { selectedOption: string }) {}
}

export class UpdateRole implements Action {
  readonly type = SettingsActionTypes.UpdateRole;

  constructor(public payload: { member: Member }) {}
}

export class CreateSite implements Action {
  readonly type = SettingsActionTypes.CreateSite;

  constructor(public payload: { site: Site }) {}
}

export class UpdateSite implements Action {
  readonly type = SettingsActionTypes.UpdateSite;

  constructor(public payload: { site: Site }) {}
}

export class DeleteSite implements Action {
  readonly type = SettingsActionTypes.DeleteSite;

  constructor(public payload: { site: Site }) {}
}

export class UpdateTeam implements Action {
  readonly type = SettingsActionTypes.UpdateTeam;

  constructor(public payload: { team: Team }) {}
}

export class DeleteVolunteer implements Action {
  readonly type = SettingsActionTypes.DeleteVolunteer;

  constructor(public payload: { volunteer: Volunteer }) {}
}

export class UpdateVisit implements Action {
  readonly type = SettingsActionTypes.UpdateVisit;

  constructor(public payload: { visit: Visit }) {}
}

export class GenerateReport implements Action {
  readonly type = SettingsActionTypes.GenerateReport;

  constructor(public payload: { startedAt: Date, endedAt: Date }) {}
}

export type SettingsActionsUnion =
  | SelectSettingsOption
  | UpdateRole
  | CreateSite
  | DeleteSite
  | UpdateSite
  | UpdateTeam
  | UpdateVisit
  | DeleteVolunteer
  | GenerateReport;
