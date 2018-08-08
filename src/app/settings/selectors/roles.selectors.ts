import { createSelector } from '@ngrx/store';
import {
  getMemberForUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getOwnerCount,
} from '../../core/selectors/members.selectors';
import { getRoleOptions } from '../../shared/helpers';
import { Member } from '../../shared/models';

export interface MemberWithRoleOptions extends Member {
  roleOptions: string[];
}

export const getMembersWithRoleOptions = createSelector(
  getMemberForUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getOwnerCount,
  (sessionMember: Member, modelMembers: Member[], ownerCount: number): MemberWithRoleOptions[] =>
    modelMembers && modelMembers.map(member => ({
      ...member,
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    })),
);
