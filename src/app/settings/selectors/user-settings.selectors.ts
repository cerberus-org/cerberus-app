import { createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { selectSessionMember, selectSessionUserInfo } from '../../auth/selectors/session.selectors';
import { Member } from '../../shared/models/index';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const selectUserSettingsContainerState = createSelector(
  selectSessionMember,
  selectSessionUserInfo,
  (member: Member, userInfo: UserInfo): UserSettingsContainerState => ({ member, email: userInfo.email }),
);
