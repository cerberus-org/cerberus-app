import { Visit, Volunteer } from '../models';
import { User } from '../models/user';
import { formatDuration } from './date-format.functions';

export const isAdmin = (user: User) => ['admin', 'owner'].includes(user.role);

export const isOwner = (user: User) => user.role === 'owner';

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
