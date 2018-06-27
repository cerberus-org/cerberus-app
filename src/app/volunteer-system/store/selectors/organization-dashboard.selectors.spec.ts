import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockSites } from '../../../mock/objects/site.mock';
import { Organization } from '../../../models';
import {
  selectOrganizationDashboardHeaderOptions,
  selectOrganizationDashboardSidenavOptions,
} from './organization-dashboard.selectors';
import objectContaining = jasmine.objectContaining;
import arrayContaining = jasmine.arrayContaining;

describe('OrganizationDashboardSelectors', () => {
  describe('selectOrganizationDashboardHeaderOptions', () => {
    let organization: Organization;

    beforeEach(() => {
      organization = createMockOrganizations()[0];
    });

    it('should set the title based on the session organization', () => {
      expect(selectOrganizationDashboardHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          title: organization.name,
        }));
    });

    it('should not set a previous URL', () => {
      expect(selectOrganizationDashboardHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          previousUrl: null,
        }));
    });

    it('should show the settings button', () => {
      expect(selectOrganizationDashboardHeaderOptions.projector(organization))
        .toEqual(objectContaining({
          showSettings: true,
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
                path: [`/checkin/${sites[0].id}`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check out',
            action: objectContaining({
              payload: objectContaining({
                path: [`/checkout/${sites[0].id}`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check in',
            action: objectContaining({
              payload: objectContaining({
                path: [`/checkin/${sites[1].id}`],
              }),
            }),
          }),
          objectContaining({
            label: 'Check out',
            action: objectContaining({
              payload: objectContaining({
                path: [`/checkout/${sites[1].id}`],
              }),
            }),
          }),
        ]));
    });
  });
});
