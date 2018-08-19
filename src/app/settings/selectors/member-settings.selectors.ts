import { Dictionary } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import {
  getMemberForCurrentUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getOwnerCount,
} from '../../core/selectors/members.selectors';
import { getUserEntities } from '../../core/selectors/users.selectors';
import { getRoleOptions } from '../../shared/helpers';
import { Member, User } from '../../shared/models';
import { MemberTableRow } from '../models/member-table-row';

export const getMemberTableRows = createSelector(
  getMemberForCurrentUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getUserEntities,
  getOwnerCount,
  (
    sessionMember: Member,
    modelMembers: Member[],
    userEntities: Dictionary<User>,
    ownerCount: number,
  ): MemberTableRow[] =>
    modelMembers && modelMembers.map(member => ({
      member,
      user: userEntities[member.userId],
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    })),
);
