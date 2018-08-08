import { createMockMembers } from '../../../mocks/objects/member.mock';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockTeams } from '../../../mocks/objects/team.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import {
  selectModelMembers,
  selectModelSites,
  selectModelTeams,
  selectModelVisits,
  selectModelVolunteers,
  selectOwnerCount,
} from './model.selectors';

describe('ModelSelectors', () => {
  it('should select teams', () => {
    expect(selectModelTeams.projector({
      teams: createMockTeams(),
    }))
      .toEqual(createMockTeams());
  });

  it('should select sites', () => {
    expect(selectModelSites.projector({
      sites: createMockSites(),
    }))
      .toEqual(createMockSites());
  });

  it('should select members', () => {
    expect(selectModelMembers.projector({
      members: createMockMembers(),
    }))
      .toEqual(createMockMembers());
  });

  it('should select visits', () => {
    expect(selectModelVisits.projector({
      visits: createMockVisits(),
    }))
      .toEqual(createMockVisits());
  });

  it('should select volunteers', () => {
    expect(selectModelVolunteers.projector({
      volunteers: createMockVolunteers(),
    }))
      .toEqual(createMockVolunteers());
  });

  it('should select the number of owners', () => {
    expect(selectOwnerCount.projector(createMockMembers()))
      .toEqual(1);
  });
});
