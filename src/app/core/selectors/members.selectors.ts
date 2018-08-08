import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { membersAdapter, MembersReducerState } from '../reducers/members.reducer';

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

export const getMembersForUser = createSelector(
  getAllMembers,
  getUserInfo,
  (members, userInfo) => members.filter(member => member.userUid === userInfo.uid),
);
