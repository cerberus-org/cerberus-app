import { Visit, Volunteer } from '../../shared/models';

/**
 * Filters an array of objects by a given team ID.
 *
 * @param {any[]} array - the array to filter
 * @param {string} teamId - the value to filter by
 * @returns {any[]} - the filtered array
 */
export const filterByTeamId = (array: any[], teamId: string) => {
  return array.filter(item => (
    item.teamId && item.teamId === teamId
  ));
};

/**
 * Filters the volunteers by name (case-insensitive).
 *
 * @param volunteers - the list of volunteers to be filtered
 * @param name - the name to filter by
 * @returns {Volunteer[]} - the filtered list of volunteers
 */
export const searchVolunteersByName = (volunteers: Volunteer[], name: string): Volunteer[] => {
  const nameLowerCase = name.toLowerCase();
  return volunteers.filter(volunteer => (
    volunteer.name.toLowerCase().includes(nameLowerCase)
  ));
};

/**
 * Selects an active visit for the given newVolunteer.
 *
 * @param {Visit[]} visits - the list of visits
 * @param {Volunteer} volunteer - the volunteer search by
 * @returns {undefined|Visit} - the active visit or undefined if not found
 */
export const findActiveVisit = (visits: Visit[], volunteer: Volunteer): Visit => {
  return visits.find(visit => (
    visit.endedAt === null && volunteer.id === visit.volunteerId
  ));
};

/**
 * Gets the unique full names from an array of volunteers.
 *
 * Used to display options on the autocomplete menu.
 * @param volunteers - the list of volunteers
 * @returns {Array<T>} - the list of unique names
 */
export const getUniqueFullNames = (volunteers: Volunteer[]): string[] => {
  return Array.from(
    new Set(volunteers.map(volunteer => volunteer.name)),
  );
};

export const getSelectedSiteId = (): string => {
  return window.location.href.split('/')[5] === 'sites' ? window.location.href.split('/')[6] : null;
};
