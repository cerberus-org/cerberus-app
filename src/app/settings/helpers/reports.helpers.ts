import { formatDuration } from '../../shared/helpers';
import { Visit, Volunteer } from '../../shared/models';

/**
 * Return an array with visits and with the associated volunteer name and visit duration.
 *
 * @param {Visit[]} visits - the visits
 * @param {Volunteer[]} volunteers
 * @returns {any[]}
 */
export const getFormattedVisits = (visits: Visit[], volunteers: Volunteer[]): any[] => {
  // Create map for O(1) lookup
  const volunteersById = volunteers.reduce(
    (map, volunteer) => {
      map.set(volunteer.id, volunteer);
      return map;
    },
    new Map<string, Volunteer>(),
  );
  return visits.map(visit => ({
    ...visit,
    endedAt: visit.endedAt ? visit.endedAt : '(no check-out)',
    duration: visit.endedAt ? formatDuration(visit.startedAt, visit.endedAt, visit.timezone) : '',
    name: volunteersById.get(visit.volunteerId).name,
  }));
};
