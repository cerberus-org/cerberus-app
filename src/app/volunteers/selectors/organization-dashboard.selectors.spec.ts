import { createMockOrganizations } from '../../../mocks/objects/organization.mock';
import { Organization } from '../../shared/models';
import { getOrganizationDashboardHeaderOptions } from './organization-dashboard.selectors';
import objectContaining = jasmine.objectContaining;

describe('OrganizationDashboardSelectors', () => {
  describe('selectOrganizationDashboardHeaderOptions', () => {
    let organization: Organization;

    beforeEach(() => {
      organization = createMockOrganizations()[0];
    });

    it('should set the title based on the session organization', () => {
      expect(getOrganizationDashboardHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          title: organization.name,
        }));
    });

    it('should not set a previous URL', () => {
      expect(getOrganizationDashboardHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          previousUrl: null,
        }));
    });
  });
});
