import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockSites } from '../../../mock/objects/site.mock';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { createMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { initialModelReducerState } from '../reducers/model.reducer';
import {
  selectModelOrganizations,
  selectModelSites,
  selectModelUsers,
  selectModelVisits,
  selectModelVolunteers,
} from './model.selectors';

describe('ModelSelectors', () => {
  it('should select organizations', () => {
    expect(selectModelOrganizations.projector({
      ...initialModelReducerState,
      organizations: createMockOrganizations(),
    }))
      .toEqual(createMockOrganizations());
  });

  it('should select sites', () => {
    expect(selectModelSites.projector({
      ...initialModelReducerState,
      sites: createMockSites(),
    }))
      .toEqual(createMockSites());
  });

  it('should select members', () => {
    expect(selectModelUsers.projector({
      ...initialModelReducerState,
      users: createMockMembers(),
    }))
      .toEqual(createMockMembers());
  });

  it('should select visits', () => {
    expect(selectModelVisits.projector({
      ...initialModelReducerState,
      visits: createMockVisits(),
    }))
      .toEqual(createMockVisits());
  });

  it('should select volunteers', () => {
    expect(selectModelVolunteers.projector({
      ...initialModelReducerState,
      volunteers: createMockVolunteers(),
    }))
      .toEqual(createMockVolunteers());
  });
});
