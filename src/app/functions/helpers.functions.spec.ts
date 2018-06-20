import { testVisits, testVolunteers } from '../models/index';
import { formatDuration } from './date-format.functions';
import {
  everyVolunteerMatchesName,
  filterVolunteersByName,
  findActiveVisit,
  findVolunteerByFullName,
  findVolunteerByPetName,
  getUniqueFullNames,
  getVisitsWithVolunteerNames,
} from './helpers.functions';

describe('helpers.functions', () => {
  it('should get visits with volunteer names', () => {
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

  it('should filter volunteers by name', () => {
    const name = testVolunteers[1].firstName;
    const filtered = filterVolunteersByName(testVolunteers, name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(testVolunteers[1]);
  });

  it('should get the unique full names from an array of volunteers', () => {
    const names = getUniqueFullNames(testVolunteers);
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    expect(names[1]).toEqual(`${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`);
  });

  it('should check if an array of volunteers have the same full name', () => {
    const volunteers = [testVolunteers[0], testVolunteers[2]];
    const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
    const allMatch = everyVolunteerMatchesName(volunteers, name);
    expect(allMatch).toBeTruthy();
  });

  it('should find volunteers by full name', () => {
    const name = `${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`;
    const selected = findVolunteerByFullName(testVolunteers, name);
    expect(selected).toEqual(testVolunteers[1]);
  });

  it('should not find volunteers by only first name', () => {
    const name = testVolunteers[1].firstName;
    const selected = findVolunteerByFullName(testVolunteers, name);
    expect(selected).toBeFalsy();
  });

  it('should find volunteers by petName', () => {
    const petName = testVolunteers[2].petName;
    const selected = findVolunteerByPetName(testVolunteers, petName);
    expect(selected).toEqual(testVolunteers[2]);
  });

  it('should find active visits for volunteers', () => {
    const volunteer = Object.assign({}, testVolunteers[0]);
    const selected = findActiveVisit(testVisits, volunteer);
    expect(selected).toEqual(testVisits[3]);
  });
});
