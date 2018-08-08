import { Action } from '@ngrx/store';
import { Member } from '../../shared/models';

export enum MembersActionTypes {
  LoadMembers = '[Members] Load Members',
  LoadMembersForTeam = '[Members] Load Members for Team',
  LoadMembersForUser = '[Members] Load Members for User',
  LoadMembersSuccess = '[Members] Load Members Success',
  SelectMember = '[Members] Select Member',
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
