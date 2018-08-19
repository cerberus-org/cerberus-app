import { Member } from '../models';
import { Roles, ROLES_LIST } from '../models/roles';

export const isAdmin = (member: Member) => member.role === Roles.Admin || member.role === Roles.Owner;

export const getMemberRoles = () => ROLES_LIST.slice();

export const getRoleValue = (role: Roles): number => ROLES_LIST.indexOf(role);

export const isGreaterRole = (roleA: Roles, roleB: Roles): boolean => (
  getRoleValue(roleA) > getRoleValue(roleB)
);

export const areSameUser = (currentMember: Member, otherMember: Member): boolean => (
  currentMember.userId === otherMember.userId
);

/**
 * Gets available role select options for a given member, based on the current member's role.
 * Owners will be able to select the "Owner" role for other members.
 * Users will not be able to select the "Locked" option for themselves.
 *
 * @param currentMember - the current member who will select an option
 * @param targetMember - the member to get available roles for
 * @param singleOwner - true if there is only one owner remaining
 * @returns {string[]} - the available options for the given member
 */
export const getRoleOptions = (currentMember: Member, targetMember: Member, singleOwner: boolean = true): Roles[] => {
  if (
    !isAdmin(currentMember)
    || !(isGreaterRole(currentMember.role, targetMember.role) || areSameUser(currentMember, targetMember))
    || (targetMember.role === Roles.Owner && singleOwner)) {
    return null;
  }
  // Filter out greater roles than current user's role
  const roles = getMemberRoles().filter(role => !isGreaterRole(role, currentMember.role));
  // Remove the "Locked" option for the current validMember
  if (areSameUser(currentMember, targetMember)) {
    roles.shift();
  }
  return roles;
};
