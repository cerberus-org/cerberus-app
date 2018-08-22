import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserInfoUid } from '../../auth/selectors/auth.selectors';
import { Member } from '../../shared/models';
import { Roles } from '../../shared/models/roles';
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
  (memberEntities, id) => memberEntities[id],
);

export const getMembersForSelectedTeam = createSelector(
  getAllMembers,
  getSelectedTeamId,
  (members, teamId) => members.filter(member => member.teamId === teamId),
);

export const getUserIdsForSelectedTeam = createSelector(
  getMembersForSelectedTeam,
  members => members.map(member => member.userId),
);

export const getMembersForUser = createSelector(
  getAllMembers,
  getUserInfoUid,
  (members, uid) => members.filter(member => member.userId === uid),
);

export const getMemberForCurrentUserAndSelectedTeam = createSelector(
  getMembersForUser,
  getSelectedTeamId,
  (members: Member[], teamId: string): Member => members.find(member => member.teamId === teamId),
);

export const getOwnerCount = createSelector(
  getMembersForSelectedTeam,
  (members: Member[]): number => members.filter(member => member.role === Roles.Owner).length,
);
