import { createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { selectSessionMember, selectSessionUserInfo } from '../../../auth/store/selectors/session.selectors';
import { Member } from '../../../core/models';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const selectUserSettingsContainerState = createSelector(
  selectSessionMember,
  selectSessionUserInfo,
  (member: Member, userInfo: UserInfo): UserSettingsContainerState => ({ member, email: userInfo.email }),
);
