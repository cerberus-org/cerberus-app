import { createSelector } from '@ngrx/store';
import { getUserInfoEmail } from '../../auth/selectors/auth.selectors';
import { getMemberForUserAndSelectedTeam } from '../../core/selectors/members.selectors';
import { Member } from '../../shared/models';

export interface UserSettingsContainerState {
  member: Member;
  email: string;
}

export const getUserSettingsContainerState = createSelector(
  getMemberForUserAndSelectedTeam,
  getUserInfoEmail,
  (member, email): UserSettingsContainerState => ({ member, email }),
);
