import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockSites } from '../../../mock/objects/site.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import {
  selectModelMembers,
  selectModelOrganizations,
  selectModelSites,
  selectModelVisits,
  selectModelVolunteers,
  selectOwnerCount,
} from './model.selectors';

describe('ModelSelectors', () => {
  it('should select organizations', () => {
    expect(selectModelOrganizations.projector({
      organizations: createMockOrganizations(),
    }))
      .toEqual(createMockOrganizations());
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
