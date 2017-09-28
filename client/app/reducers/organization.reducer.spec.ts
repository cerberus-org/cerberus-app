import 'hammerjs';

import { organizationReducer } from './organization.reducer';
import { testOrganizations, Organization } from '../models/organization';

describe('organizationReducer', () => {
  let organizations: Organization[];

  beforeEach(() => {
    organizations = testOrganizations.slice(0);
  });

  it('loads organizations', () => {
    const result = organizationReducer([], { type: 'LOAD_ORGANIZATIONS', payload: organizations });
    expect(result).toBe(organizations);
  });

  it('adds a organization', () => {
    const organization = Object.assign({}, organizations[0]);
    const result = organizationReducer(organizations, { type: 'ADD_ORGANIZATION', payload: organization });
    expect(result[0]).toBe(organization);
    expect(result.length).toBe(organizations.length + 1);
  });

  it('modifies a organization', () => {
    const modified = Object.assign({}, organizations[0]);
    const result = organizationReducer(organizations, { type: 'MODIFY_ORGANIZATION', payload: modified });
    expect(result[0]).toBe(modified);
  });
});
