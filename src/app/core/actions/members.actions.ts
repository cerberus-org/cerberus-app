import { Action } from '@ngrx/store';
import { Member } from '../../shared/models';

export enum MembersActionTypes {
  LoadMembers = '[members] load members',
  LoadMembersForTeam = '[members] load members for team',
  LoadMembersForUser = '[members] load members for user',
  LoadMembersSuccess = '[members] load members success',
  SelectMember = '[members] select member',
}

export class LoadMembers implements Action {
  readonly type = MembersActionTypes.LoadMembers;
}

export class LoadMembersForTeam implements Action {
  readonly type = MembersActionTypes.LoadMembersForTeam;

  constructor(public payload: { teamId: string }) {}
}

export class LoadMembersForUser implements Action {
  readonly type = MembersActionTypes.LoadMembersForUser;
}

export class LoadMembersSuccess implements Action {
  readonly type = MembersActionTypes.LoadMembersSuccess;

  constructor(public payload: { members: Member[] }) {}
}

export class SelectMember implements Action {
  readonly type = MembersActionTypes.SelectMember;

  constructor(public payload: { memberId: string }) {}
}

export type MembersActionsUnion =
  | LoadMembers
  | LoadMembersForTeam
  | LoadMembersForUser
  | LoadMembersSuccess
  | SelectMember;
