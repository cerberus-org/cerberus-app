import { testOrganizations, Organization } from '../models/organization';
import * as fromOrganizations from './organizations.reducer'
import * as OrganizationActions from '../actions/organizations.actions';

describe('organizationReducer', () => {
  let organizations: Organization[];

  beforeEach(() => {
    organizations = testOrganizations.slice(0);
  });

  describe('LOAD', () => {

    it('loads organizations', () => {
      const result = fromOrganizations.reducer({ organizations: organizations }, new OrganizationActions.Load(organizations)).organizations;
      expect(result).toBe(organizations);
    });
  });

  describe('ADD', () => {

    it('adds a organization', () => {
      const organization = Object.assign({}, organizations[0]);
      const result = fromOrganizations.reducer({ organizations: organizations }, new OrganizationActions.Add(organization)).organizations;
      expect(result[0]).toBe(organization);
      expect(result.length).toBe(organizations.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a organization', () => {
      const modified = Object.assign({}, organizations[0]);
      const result = fromOrganizations.reducer({ organizations: organizations }, new OrganizationActions.Modify(modified)).organizations;
      expect(result[0]).toBe(modified);
    });
  });
});
