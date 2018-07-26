import { Member } from '../models';

export const isAdmin = (user: Member) => [MEMBER_ROLE_ADMIN, MEMBER_ROLE_OWNER].includes(user.role);

export const MEMBER_ROLE_LOCKED = 'Locked';
export const MEMBER_ROLE_MEMBER = 'Member';
export const MEMBER_ROLE_ADMIN = 'Admin';
export const MEMBER_ROLE_OWNER = 'Owner';
export const MEMBER_ROLES = [
  MEMBER_ROLE_LOCKED,
  MEMBER_ROLE_MEMBER,
  MEMBER_ROLE_ADMIN,
  MEMBER_ROLE_OWNER,
];

export const getMemberRoles = () => MEMBER_ROLES.slice();

export const getRoleValue = (role: string): number => MEMBER_ROLES.indexOf(role);

export const isGreaterRole = (roleA: string, roleB: string): boolean => (
  getRoleValue(roleA) > getRoleValue(roleB)
);

export const areSameUser = (currentMember: Member, otherMember: Member): boolean => (
  currentMember.userUid === otherMember.userUid
);

/**
 * Gets available role select options for a given member, based on the current member's role.
 * Owners will be able to select the "Owner" role for other members.
 * Users will not be able to select the "Locked" option for themselves.
 *
 * @param sessionMember - the current member who will select an option
 * @param targetMember - the member to get available roles for
 * @param singleOwner - true if there is only one owner remaining
 * @returns {string[]} - the available options for the given member
 */
export const getRoleOptions = (sessionMember: Member, targetMember: Member, singleOwner: boolean = true): string[] => {
  if (
    !isAdmin(sessionMember)
    || !(isGreaterRole(sessionMember.role, targetMember.role) || areSameUser(sessionMember, targetMember))
    || (targetMember.role === MEMBER_ROLE_OWNER && singleOwner)) {
    return null;
  }
  // Filter out greater roles than current user's role
  const roles = getMemberRoles().filter(role => !isGreaterRole(role, sessionMember.role));
  // Remove the "Locked" option for the current validMember
  if (areSameUser(sessionMember, targetMember)) {
    roles.shift();
  }
  return roles;
};
