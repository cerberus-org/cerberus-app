import { createMockVisits } from '../../../mock/objects/visit.mock';
import arrayContaining = jasmine.arrayContaining;
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { selectVisitWithVolunteers } from './visits.selectors';

describe('visits.selectors', () => {
  describe('selectVisitWithVolunteers', () => {
    it('it should select visits with volunteers for the Visits page', () => {
      const mockVisits = [createMockVisits()[0]];
      const mockVolunteers = [createMockVolunteers()[0]];
      expect(selectVisitWithVolunteers.projector(mockVisits, mockVolunteers))
        .toEqual(arrayContaining([
          Object.assign(mockVisits[0], { volunteer: mockVolunteers[0] }),
        ]));
    });
  });
});
