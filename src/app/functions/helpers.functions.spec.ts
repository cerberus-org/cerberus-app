import { testVisits, testVolunteers } from '../models';
import { formatDuration } from './date-format.functions';
import {
  everyVolunteerMatchesName,
  filterVolunteersByName,
  findActiveVisit,
  findVolunteerByName,
  findVolunteerByPetName,
  getUniqueNames,
  getVisitsWithVolunteerNames,
} from './helpers.functions';

describe('helpers.functions', () => {
  describe('getVisitsWithVolunteerNames()', () => {
    it('should map visits to volunteers', () => {
      const visits = [testVisits[1]];
      const volunteers = [testVolunteers[1]];
      const expected = [{
        id: '674a861ace7ca574af9070c1',
        organizationId: '59a7055733bfe28af47cff40',
        siteId: '59bc1e7ad92a6ac6f6252bfa',
        volunteerId: '5961327dfba1ca1b64b8945b',
        startedAt: new Date('2017-06-29T12:45:42.336Z'),
        endedAt: new Date('2017-06-29T18:45:42.336Z'),
        timezone: 'America/New_York',
        signature: null,
        name: volunteers[0].firstName + ' ' + volunteers[0].lastName,
        duration: formatDuration(visits[0].startedAt, visits[0].endedAt, visits[0].timezone),
      }];
      const formatted = getVisitsWithVolunteerNames(visits, volunteers);
      expect(formatted).toEqual(expected);
    });
  });

  describe('filterVolunteersByName()', () => {
    it('should filter by name', () => {
      const name = testVolunteers[1].firstName;
      const filtered = filterVolunteersByName(testVolunteers, name);
      expect(filtered.length).toEqual(1);
      expect(filtered[0]).toBe(testVolunteers[1]);
    });
  });

  describe('getUniqueNames()', () => {
    it('should create the list of unique names for the filtered testVolunteers', () => {
      const names = getUniqueNames(testVolunteers);
      expect(names.length).toEqual(2);
      expect(names[0]).toEqual(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
      expect(names[1]).toEqual(`${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`);
    });
  });

  describe('everyVolunteerMatchesName()', () => {
    it('should check if the filtered volunteers all match the same name', () => {
      const volunteers = [testVolunteers[0], testVolunteers[2]];
      const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
      const allMatch = everyVolunteerMatchesName(volunteers, name);
      expect(allMatch).toBeTruthy();
    });
  });

  describe('everyVolunteerMatchesName()', () => {
    it('should check if the filtered volunteers all match the same name', () => {
      const volunteers = [testVolunteers[0], testVolunteers[2]];
      const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
      const allMatch = everyVolunteerMatchesName(volunteers, name);
      expect(allMatch).toBeTruthy();
    });
  });

  describe('findVolunteerByName()', () => {
    it('should select a newVolunteer by name', () => {
      const name = `${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`;
      const selected = findVolunteerByName(testVolunteers, name);
      expect(selected).toBe(testVolunteers[1]);
    });

    it('should not select a newVolunteer if the name does not exactly match', () => {
      const name = testVolunteers[1].firstName;
      const selected = findVolunteerByName(testVolunteers, name);
      expect(selected).toBeFalsy();
    });
  });

  describe('findVolunteerByPetName()', () => {
    it('should select a newVolunteer by petName', () => {
      const petName = testVolunteers[2].petName;
      const selected = findVolunteerByPetName(testVolunteers, petName);
      expect(selected).toBe(testVolunteers[2]);
    });
  });

  describe('findActiveVisit()', () => {
    it('should select an active visit for a volunteer', () => {
      const volunteer = Object.assign({}, testVolunteers[0]);
      const selected = findActiveVisit(testVisits, volunteer);
      expect(selected).toBe(testVisits[3]);
    });
  });
});
