import { createSelector } from '@ngrx/store';
import { selectSessionMember } from '../../../auth/store/selectors/session.selectors';
import { getRoleOptions } from '../../../shared/helpers';
import { Member } from '../../../shared/models';
import { selectModelMembers, selectOwnerCount } from '../../../core/store/selectors/model.selectors';

export interface MemberWithRoleOptions extends Member {
  roleOptions: string[];
}

export const selectMembersWithRoleOptions = createSelector(
  selectSessionMember,
  selectModelMembers,
  selectOwnerCount,
  (sessionMember: Member, modelMembers: Member[], ownerCount: number): MemberWithRoleOptions[] => modelMembers.map(
    member => ({
      ...member,
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    }),
  ),
);
