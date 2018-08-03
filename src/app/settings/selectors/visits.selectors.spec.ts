import arrayContaining = jasmine.arrayContaining;
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { selectVisitWithVolunteers } from './visits.selectors';

describe('visits.selectors', () => {
  describe('selectVisitWithVolunteers', () => {
    it('it should select visits with volunteers for the Visits page', () => {
      const mockVisits = [createMockVisits()[0]];
      const mockVolunteers = [createMockVolunteers()[0]];
      const mockSites = [createMockSites()];
      expect(selectVisitWithVolunteers.projector(mockVisits, mockVolunteers, mockSites))
        .toEqual(arrayContaining([
          Object.assign(mockVisits[0], { volunteer: mockVolunteers[0], organizationSites: mockSites, selectedSite: mockSites[0] }),
        ]));
    });
  });
});
