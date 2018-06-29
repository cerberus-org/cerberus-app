import { Member } from '../models/index';

export const isAdmin = (user: Member) => ['Admin', 'Owner'].includes(user.role);

export const USER_ROLES = ['Locked', 'Member', 'Admin', 'Owner'];

const getRoleValue = (role: string): number => USER_ROLES.indexOf(role);

const isGreaterRole = (roleA: string, roleB: string): boolean => (
  getRoleValue(roleA) > getRoleValue(roleB)
);

const isOwner = (user): boolean => getRoleValue(user.role) === 3;

export const isLastOwner = (currentUser: Member, users: Member[]): boolean => (
  isOwner(currentUser) && users.filter(user => isOwner(user)).length === 1
);

const areSameUser = (currentUser: Member, otherUser: Member): boolean => (
  currentUser.id === otherUser.id
);

/**
 * Compares the roles between two members and returns true
 * if member A has a greater role than member B.
 * Returns true if currentUser and otherUser have the same ID.
 * @param currentUser - the current member
 * @param otherUser - the member to compare against
 * @returns {boolean} true if greater, false if lesser
 */
export const canSelectRole = (currentUser: Member, otherUser: Member): boolean => (
  isAdmin(currentUser)
  && (
    areSameUser(currentUser, otherUser)
    || isGreaterRole(currentUser.role, otherUser.role)
  )
);

/**
 * Gets available role select options for a given member, based on the current member's role.
 * Owners will be able to select the "Owner" role for other members.
 * Users will not be able to select the "Locked" option for themselves.
 * @param currentUser - the current member who will select an option
 * @param otherUser - the member to get available roles for
 * @returns {string[]} - the available options for the given member
 */
export const getRoleOptions = (currentUser: Member, otherUser: Member): string[] => {
  if (!isAdmin(currentUser) || isGreaterRole(otherUser.role, currentUser.role)) {
    return null;
  }
  // Filter out greater roles (use all for owners) and include current validMember's role
  const roles = (
    isOwner(currentUser)
      ? USER_ROLES
      : USER_ROLES.filter(role => (
        isGreaterRole(currentUser.role, role)
        || (areSameUser(currentUser, otherUser) && currentUser.role === role)
      ))
  )
    .slice();
  // Remove the "Locked" option for the current validMember
  if (areSameUser(currentUser, otherUser)) {
    roles.shift();
  }
  return roles;
};
