import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import * as fromMembers from '../reducers/members.reducer';

export const getMembersState = createFeatureSelector<fromMembers.State>('members');

export const {
  selectAll: getAllMembers,
  selectEntities: getMemberEntities,
} = fromMembers.adapter.getSelectors(getMembersState);

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
