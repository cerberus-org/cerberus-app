import { Action } from '@ngrx/store';
import { UserFormChanges } from '../../shared/components/user-form/user-form.component';
import { Member, Site, Team, Visit, Volunteer } from '../../shared/models';

export enum SettingsActionTypes {
  SelectSettingsOption = '[Settings] Select Settings Option',
  CreateSite = '[Settings] Create Site',
  UpdateSite = '[Settings] Update Site',
  DeleteSite = '[Settings] Delete Site',
  UpdateRole = '[Settings] Update Role',
  UpdateTeam = '[Settings] Update Team',
  UpdateUser = '[Settings] Update User',
  UpdateVisit = '[Settings] Update Visit',
  DeleteVolunteer = '[Settings] Delete Volunteer',
  GenerateReport = '[Settings] Generate Report',
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

export class UpdateUser implements Action {
  readonly type = SettingsActionTypes.UpdateUser;

  constructor(public payload: { edits: UserFormChanges }) {}
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
  | UpdateUser
  | UpdateVisit
  | DeleteVolunteer
  | GenerateReport;
