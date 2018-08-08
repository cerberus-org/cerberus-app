import { createSelector } from '@ngrx/store';
import { getMemberForSelectedTeam, selectModelMembers, selectOwnerCount } from '../../core/selectors/model.selectors';
import { getRoleOptions } from '../../shared/helpers';
import { Member } from '../../shared/models';

export interface MemberWithRoleOptions extends Member {
  roleOptions: string[];
}

export const selectMembersWithRoleOptions = createSelector(
  getMemberForSelectedTeam,
  selectModelMembers,
  selectOwnerCount,
  (sessionMember: Member, modelMembers: Member[], ownerCount: number): MemberWithRoleOptions[] => modelMembers.map(
    member => ({
      ...member,
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    }),
  ),
);
