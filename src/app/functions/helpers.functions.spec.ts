import { testVisits, testVolunteers } from '../models';
import { formatDuration } from './date-format.functions';
import { getVisitsWithVolunteerNames } from './helpers.functions';

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
