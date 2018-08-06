import { createMockOrganizations } from '../../../mocks/objects/organization.mock';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { Organization } from '../../shared/models';
import {
  getOrganizationDashboardHeaderOptions,
  selectOrganizationDashboardSidenavOptions,
} from './organization-dashboard.selectors';
import arrayContaining = jasmine.arrayContaining;
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

  describe('selectOrganizationDashboardSidenavOptions', () => {
    it('should select the sidenav options for check in and check out for each site', () => {
      const sites = createMockSites();
      expect(selectOrganizationDashboardSidenavOptions.projector(createMockSites()))
        .toEqual(arrayContaining([
          objectContaining({
            label: 'Check in',
            action: objectContaining({
              payload: objectContaining({
                path: [`organization/volunteers/${sites[0].id}/check-in`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check out',
            action: objectContaining({
              payload: objectContaining({
                path: [`organization/volunteers/${sites[0].id}/check-out`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check in',
            action: objectContaining({
              payload: objectContaining({
                path: [`organization/volunteers/${sites[1].id}/check-in`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check out',
            action: objectContaining({
              payload: objectContaining({
                path: [`organization/volunteers/${sites[1].id}/check-out`],
              }),
            }),
          }),
        ]));
    });
  });
});
