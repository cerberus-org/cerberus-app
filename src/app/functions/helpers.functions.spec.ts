import { mockVisits } from '../mock/objects/visit.mock';
import { mockVolunteers } from '../mock/objects/volunteer.mock';
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
    const visits = [mockVisits[1]];
    const volunteers = [mockVolunteers[1]];
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
    const name = mockVolunteers[1].firstName;
    const filtered = filterVolunteersByName(mockVolunteers, name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(mockVolunteers[1]);
  });

  it('should get the unique full names from an array of volunteers', () => {
    const names = getUniqueFullNames(mockVolunteers);
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${mockVolunteers[0].firstName} ${mockVolunteers[0].lastName}`);
    expect(names[1]).toEqual(`${mockVolunteers[1].firstName} ${mockVolunteers[1].lastName}`);
  });

  it('should check if an array of volunteers have the same full name', () => {
    const volunteers = [mockVolunteers[0], mockVolunteers[2]];
    const name = `${mockVolunteers[0].firstName} ${mockVolunteers[0].lastName}`;
    const allMatch = everyVolunteerMatchesName(volunteers, name);
    expect(allMatch).toBeTruthy();
  });

  it('should find volunteers by full name', () => {
    const name = `${mockVolunteers[1].firstName} ${mockVolunteers[1].lastName}`;
    const selected = findVolunteerByFullName(mockVolunteers, name);
    expect(selected).toEqual(mockVolunteers[1]);
  });

  it('should not find volunteers by only first name', () => {
    const name = mockVolunteers[1].firstName;
    const selected = findVolunteerByFullName(mockVolunteers, name);
    expect(selected).toBeFalsy();
  });

  it('should find volunteers by petName', () => {
    const petName = mockVolunteers[2].petName;
    const selected = findVolunteerByPetName(mockVolunteers, petName);
    expect(selected).toEqual(mockVolunteers[2]);
  });

  it('should find active visits for volunteers', () => {
    const volunteer = Object.assign({}, mockVolunteers[0]);
    const selected = findActiveVisit(mockVisits, volunteer);
    expect(selected).toEqual(mockVisits[3]);
  });
});
