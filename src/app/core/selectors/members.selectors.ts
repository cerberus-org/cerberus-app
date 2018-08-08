import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { MEMBER_ROLE_OWNER } from '../../shared/helpers';
import { Member } from '../../shared/models';
import { membersAdapter, MembersReducerState } from '../reducers/members.reducer';
import { getSelectedTeamId } from './teams.selectors';

export const getMembersState = createFeatureSelector<MembersReducerState>('members');

export const {
  selectAll: getAllMembers,
  selectEntities: getMemberEntities,
} = membersAdapter.getSelectors(getMembersState);

export const getSelectedMemberId = createSelector(
  getMembersState,
  state => state.selectedMemberId,
);

export const getSelectedMember = createSelector(
  getMemberEntities,
  getSelectedMemberId,
  (members, id) => members[id],
);

export const getMembersForSelectedTeam = createSelector(
  getAllMembers,
  getSelectedTeamId,
  (members, teamId) => members.filter(member => member.teamId === teamId),
);

export const getMembersForUser = createSelector(
  getAllMembers,
  getUserInfo,
  (members, userInfo) => members.filter(member => member.userUid === userInfo.uid),
);

export const getMemberForUserAndSelectedTeam = createSelector(
  getMembersForUser,
  getSelectedTeamId,
  (members: Member[], teamId: string): Member => members.find(member => member.teamId === teamId),
);

export const getOwnerCount = createSelector(
  getMembersForSelectedTeam,
  (members: Member[]): number => members.filter(member => member.role === MEMBER_ROLE_OWNER).length,
);
