import { createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { getMemberForUserAndSelectedTeam } from '../../core/selectors/members.selectors';
import { Member } from '../../shared/models';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const getUserSettingsContainerState = createSelector(
  getMemberForUserAndSelectedTeam,
  getUserInfo,
  (member: Member, userInfo: UserInfo): UserSettingsContainerState => ({ member, email: userInfo.email }),
);
