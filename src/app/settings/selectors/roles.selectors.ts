import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import {
  getMemberForUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getOwnerCount,
} from '../../core/selectors/members.selectors';
import { getUserEntities } from '../../core/selectors/users.selectors';
import { getRoleOptions } from '../../shared/helpers';
import { Member, User } from '../../shared/models';

export interface RolesTableRow {
  member: Member;
  user: User;
  roleOptions: string[];
}

export const getMembersWithRoleOptions = createSelector(
  getMemberForUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getUserEntities,
  getOwnerCount,
  (
    sessionMember: Member,
    modelMembers: Member[],
    userEntities: Dictionary<User>,
    ownerCount: number,
  ): RolesTableRow[] =>
    modelMembers && modelMembers.map(member => ({
      member,
      user: userEntities[member.userUid],
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    })),
);
