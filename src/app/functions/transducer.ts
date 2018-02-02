import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';
import { formatDuration } from './date-format';

/**
 * Return an array with visits and with the associated volunteer name and visit duration.
 * @param {Visit[]} visits
 * @param {Volunteer[]} volunteers
 * @returns {any[]}
 */
export const mapVisitsToVolunteers = function(visits: Visit[], volunteers: Volunteer[]): any[] {
  let found = false;
  const volunteerHistory = [];
  for (const visit of visits) {
    for (const volunteer of volunteers) {
      if (visit.volunteerId === volunteer.id) {
        found = true;
        volunteerHistory.push(
          Object.assign({}, visit, { name: volunteer.firstName + ' ' + volunteer.lastName, duration: formatDuration(visit.startedAt, visit.endedAt, visit.timezone) })
        )
      }
    }
    if (!found) {
      volunteerHistory.push(Object.assign({}, visit, { name: 'Deleted Volunteer', duration: formatDuration(visit.startedAt, visit.endedAt, visit.timezone) }));
    }
    found = false;
  }
  return volunteerHistory;
};
