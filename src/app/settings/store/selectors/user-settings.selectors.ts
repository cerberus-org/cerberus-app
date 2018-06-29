import { createSelector } from '@ngrx/store';
import { User } from 'firebase';
import { selectSessionMember, selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { Member } from '../../../models';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const selectUserSettingsContainerState = createSelector(
  selectSessionMember,
  selectSessionUser,
  (member: Member, user: User): UserSettingsContainerState => ({ member, email: user.email }),
);
