import { createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { getMemberForSelectedTeam } from '../../core/selectors/model.selectors';
import { Member } from '../../shared/models';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const selectUserSettingsContainerState = createSelector(
  getMemberForSelectedTeam,
  getUserInfo,
  (member: Member, userInfo: UserInfo): UserSettingsContainerState => ({ member, email: userInfo.email }),
);
