import { Visit, Volunteer } from '../models';
import { formatDuration } from './date-format.functions';

/**
 * Checks if an array of volunteers have the same full name (case-insensitive).
 *
 * @param volunteers - the list of volunteers
 * @param name - the name used to match
 * @returns {boolean} - true if all volunteers match the name
 */
export const everyVolunteerMatchesName = (volunteers: Volunteer[], name: string): boolean => {
  const nameLowerCase = name.toLowerCase();
  return volunteers.every(volunteer => (
    getFullName(volunteer).toLowerCase() === nameLowerCase
  ));
};

/**
 * Filters an array of objects by a given organization ID.
 *
 * @param {any[]} array - the array to filter
 * @param {string} organizationId - the value to filter by
 * @returns {any[]} - the filtered array
 */
export const filterByOrganizationId = (array: any[], organizationId: string) => {
  return array.filter(item => (
    item.organizationId && item.organizationId === organizationId
  ));
};

/**
 * Filters the volunteers by name (case-insensitive).
 *
 * @param volunteers - the list of volunteers to be filtered
 * @param name - the name to filter by
 * @returns {Volunteer[]} - the filtered list of volunteers
 */
export const filterVolunteersByName = (volunteers: Volunteer[], name: string): Volunteer[] => {
  const nameLowerCase = name.toLowerCase();
  return volunteers.filter(volunteer => (
    getFullName(volunteer).toLowerCase().includes(nameLowerCase)
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
 * Finds a volunteer by name (case-insensitive).
 *
 * @param volunteers - the list of volunteers
 * @param name - string used to search by name
 * @returns {undefined|Volunteer} - the newVolunteer or undefined if not found
 */
export const findVolunteerByFullName = (volunteers: Volunteer[], name: string): Volunteer => {
  const nameLowerCase = name.toLowerCase();
  return volunteers.find(volunteer => (
    getFullName(volunteer).toLowerCase() === nameLowerCase
  ));
};


/**
 * Finds a volunteer by petName (case-insensitive).
 *
 * @param volunteers - the list of volunteers
 * @param petName - string used to search by petName
 * @returns {undefined|Volunteer} - the newVolunteer or undefined if not found
 */
export const findVolunteerByPetName = (volunteers: Volunteer[], petName: string): Volunteer => {
  const petNameLowerCase = petName.toLowerCase();
  return volunteers.find(volunteer => (
    volunteer.petName.toLowerCase() === petNameLowerCase
  ));
};

/**
 * Gets the full name for a given volunteer.
 *
 * @param {Volunteer} volunteer - Volunteer to get full name for
 * @returns {string} - the full name
 */
export const getFullName = (volunteer: Volunteer) => {
  return volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : '(deleted)';
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
    new Set(volunteers.map(volunteer => getFullName(volunteer))),
  );
};

/**
 * Return an array with visits and with the associated volunteer name and visit duration.
 *
 * @param {Visit[]} visits - the visits
 * @param {Volunteer[]} volunteers
 * @returns {any[]}
 */
export const getVisitsWithVolunteerNames = (visits: Visit[], volunteers: Volunteer[]) => {
  // Create map for O(1) lookup
  const volunteersById = volunteers.reduce(
    (map, volunteer) => {
      map.set(volunteer.id, volunteer);
      return map;
    },
    new Map<string, Volunteer>(),
  );
  return visits.map(visit => Object.assign(
    {},
    visit,
    { duration: visit.endedAt ? formatDuration(visit.startedAt, visit.endedAt, visit.timezone) : '' },
    { endedAt: visit.endedAt ? visit.endedAt : '(no check-out)' },
    { name: getFullName(volunteersById.get(visit.volunteerId)) },
  ));
};

/**
 * Sorts a given array of visits by their start date.
 *
 * @param {Visit[]} visits - the array of visits to be sorted
 * @returns {Visit[]} - the sorted array of visits
 */
export const sortVisitsByStartedAt = (visits: Visit[]): Visit[] => {
  return visits.slice().sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
};
