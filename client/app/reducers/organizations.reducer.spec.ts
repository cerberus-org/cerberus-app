import { testOrganizations, Organization } from '../models/organization';
import * as fromOrganizations from './organizations.reducer'
import * as OrganizationActions from '../actions/organizations.actions';

describe('organizationReducer', () => {
  let organizations: Organization[];

  beforeEach(() => {
    organizations = testOrganizations.slice(0);

  });

  it('loads organizations', () => {
    const result = fromOrganizations.reducer(fromOrganizations.initialState, new OrganizationActions.Load(organizations)).organizations;
    expect(result).toBe(organizations);
  });

  it('adds a organization', () => {
    const organization = Object.assign({}, organizations[0]);
    const result = fromOrganizations.reducer(fromOrganizations.initialState, new OrganizationActions.Add(organization)).organizations;
    expect(result[0]).toBe(organization);
    expect(result.length).toBe(organizations.length + 1);
  });

  it('modifies a organization', () => {
    const modified = Object.assign({}, organizations[0]);
    const result = fromOrganizations.reducer(fromOrganizations.initialState, new OrganizationActions.Modfiy(modified)).organizations;
    expect(result[0]).toBe(modified);
  });
});
