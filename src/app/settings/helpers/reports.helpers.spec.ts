import { mockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { formatDuration } from '../../shared/helpers';
import { getFormattedVisits } from './reports.helpers';

describe('reports helpers', () => {
  it('should get visits with volunteer names', () => {
    const visits = [mockVisits[1]];
    const volunteers = [createMockVolunteers()[1]];
    const expected = [{
      ...mockVisits[1],
      name: volunteers[0].name,
      duration: formatDuration(visits[0].startedAt, visits[0].endedAt, visits[0].timezone),
    }];
    const formatted = getFormattedVisits(visits, volunteers);
    expect(formatted).toEqual(expected);
  });
});
