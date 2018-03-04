import { Visit, Volunteer } from '../models';
import { User } from '../models/user';
import { formatDuration } from './date-format.functions';

export const isAdmin = (user: User) => ['Admin', 'Owner'].includes(user.role);

/**
 * Compares the roles between two users and returns true
 * if user A has a higher role than user B.
 * @param userA - the user to compare for
 * @param userB - the user to compare against
 * @returns {boolean}
 */
export const compareByRole = (userA: User, userB: User) => {
  const roles = ['Member', 'Admin', 'Owner'];
  return userA.id === userB.id || roles.indexOf(userA.role) > roles.indexOf(userB.role);
};

export const filterByOrganizationId = (array: any[], organizationId: string) => (
  array.filter(item => item.organizationId === organizationId)
);

export const getFullName = (volunteer: Volunteer) => (
  volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : '(deleted)'
);

/**
 * Return an array with visits and with the associated volunteer name and visit duration.
 * @param {Visit[]} visits
 * @param {Volunteer[]} volunteers
 * @returns {any[]}
 */
export const getVisitsWithVolunteerNames = (visits: Visit[], volunteers: Volunteer[]) => (
  visits.map(visit => Object.assign(
    {},
    visit,
    { duration: visit.endedAt ? formatDuration(visit.startedAt, visit.endedAt, visit.timezone) : '' },
    { endedAt: visit.endedAt ? visit.endedAt : '(no check-out)' },
    { name: getFullName(volunteers.find(volunteer => volunteer.id === visit.volunteerId)) },
  ))
);

export const sortVisitsByDate = (visits: Visit[]) => (
  visits.slice().sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime())
);
