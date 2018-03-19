import { User } from '../models';

export const isAdmin = (user: User) => ['Admin', 'Owner'].includes(user.role);

const USER_ROLES = ['Locked', 'Member', 'Admin', 'Owner'];

const getRoleValue = (role: string): number => USER_ROLES.indexOf(role);

const isGreaterRole = (roleA: string, roleB: string): boolean => (
  getRoleValue(roleA) > getRoleValue(roleB)
);

const isOwner = (user): boolean => getRoleValue(user.role) === 3;

export const isLastOwner = (currentUser: User, users: User[]): boolean => (
  isOwner(currentUser) && users.filter(user => isOwner(user)).length === 1
);

const areSameUser = (currentUser: User, otherUser: User): boolean => (
  currentUser.id === otherUser.id
);

/**
 * Compares the roles between two users and returns true
 * if user A has a greater role than user B.
 * Returns true if currentUser and otherUser have the same ID.
 * @param currentUser - the current user
 * @param otherUser - the user to compare against
 * @returns {boolean} true if greater, false if lesser
 */
export const canSelectRole = (currentUser: User, otherUser: User): boolean => (
  isAdmin(currentUser)
  && (
    areSameUser(currentUser, otherUser)
    || isGreaterRole(currentUser.role, otherUser.role)
  )
);

/**
 * Gets available role select options for a given user, based on the current user's role.
 * Owners will be able to select the "Owner" role for other users.
 * Users will not be able to select the "Locked" option for themselves.
 * @param currentUser - the current user who will select an option
 * @param otherUser - the user to get available roles for
 * @returns {string[]} - the available options for the given user
 */
export const getRoleOptions = (currentUser: User, otherUser: User): string[] => {
  if (!isAdmin(currentUser) || isGreaterRole(otherUser.role, currentUser.role)) {
    return null;
  }
  // Filter out greater roles (use all for owners) and include current user's role
  const roles = (
    isOwner(currentUser)
      ? USER_ROLES
      : USER_ROLES.filter(role => (
        isGreaterRole(currentUser.role, role)
        || (areSameUser(currentUser, otherUser) && currentUser.role === role)
      ))
  )
    .slice();
  // Remove the "Locked" option for the current user
  if (areSameUser(currentUser, otherUser)) {
    roles.shift();
  }
  return roles;
};
