import { Action } from '@ngrx/store';
import { Member } from '../../shared/models';

export enum MembersActionTypes {
  LoadMembers = '[members] load members',
  LoadMembersForTeam = '[members] load members for team',
  LoadMembersForUser = '[members] load members for user',
  SelectMember = '[members] select member',
  MemberAdded = '[members] added',
  MemberUpdated = '[members] updated',
  MemberRemoved = '[members] removed',
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

export class SelectMember implements Action {
  readonly type = MembersActionTypes.SelectMember;

  constructor(public payload: { memberId: string }) {}
}

// AngularFire2 StateChanges

export class MemberAdded implements Action {
  readonly type = MembersActionTypes.MemberAdded;

  constructor(public payload: Member) {}
}

export class MemberUpdated implements Action {
  readonly type = MembersActionTypes.MemberUpdated;

  constructor(public payload: Member) {}
}

export class MemberRemoved implements Action {
  readonly type = MembersActionTypes.MemberRemoved;

  constructor(public payload: Member) {}
}

export type MembersActionsUnion =
  | LoadMembers
  | LoadMembersForTeam
  | LoadMembersForUser
  | SelectMember
  | MemberAdded
  | MemberUpdated
  | MemberRemoved;
