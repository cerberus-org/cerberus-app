import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';
import { formatDuration } from './date-format';

const getName = (volunteer: Volunteer) => (
  volunteer
    ? `${volunteer.firstName} ${volunteer.lastName}`
    : '(deleted)'
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
    { name: getName(volunteers.find(volunteer => volunteer.id === visit.volunteerId)) },
  ))
);
