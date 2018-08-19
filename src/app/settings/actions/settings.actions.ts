import { Action } from '@ngrx/store';
import { Member, Site, Team, Visit, Volunteer } from '../../shared/models';

export enum SettingsActionTypes {
  CreateSite = '[settings] create site',
  GenerateReport = '[settings] generate report',
  RemoveMember = '[settings] remove member',
  RemoveSite = '[settings] remove site',
  RemoveVolunteer = '[settings] remove volunteer',
  SelectSettingsOption = '[settings] select settings option',
  UpdateRole = '[settings] update role',
  UpdateSite = '[settings] update site',
  UpdateTeam = '[settings] update team',
  UpdateVisit = '[settings] update visit',
}

export class CreateSite implements Action {
  readonly type = SettingsActionTypes.CreateSite;

  constructor(public payload: { site: Site }) {}
}

export class GenerateReport implements Action {
  readonly type = SettingsActionTypes.GenerateReport;

  constructor(public payload: { startedAt: Date, endedAt: Date }) {}
}

export class RemoveMember implements Action {
  readonly type = SettingsActionTypes.RemoveMember;

  constructor(public payload: { member: Member }) {}
}

export class RemoveSite implements Action {
  readonly type = SettingsActionTypes.RemoveSite;

  constructor(public payload: { site: Site }) {}
}

export class RemoveVolunteer implements Action {
  readonly type = SettingsActionTypes.RemoveVolunteer;

  constructor(public payload: { volunteer: Volunteer }) {}
}

export class SelectSettingsOption implements Action {
  readonly type = SettingsActionTypes.SelectSettingsOption;

  constructor(public payload: { selectedOption: string }) {}
}

export class UpdateRole implements Action {
  readonly type = SettingsActionTypes.UpdateRole;

  constructor(public payload: { member: Member }) {}
}

export class UpdateSite implements Action {
  readonly type = SettingsActionTypes.UpdateSite;

  constructor(public payload: { site: Site }) {}
}

export class UpdateTeam implements Action {
  readonly type = SettingsActionTypes.UpdateTeam;

  constructor(public payload: { team: Team }) {}
}

export class UpdateVisit implements Action {
  readonly type = SettingsActionTypes.UpdateVisit;

  constructor(public payload: { visit: Visit }) {}
}

export type SettingsActionsUnion =
  | CreateSite
  | GenerateReport
  | RemoveMember
  | RemoveSite
  | RemoveVolunteer
  | SelectSettingsOption
  | UpdateRole
  | UpdateSite
  | UpdateTeam
  | UpdateVisit;
