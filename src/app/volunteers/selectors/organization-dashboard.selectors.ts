import { createSelector } from '@ngrx/store';
import * as RouterActions from '../../core/actions/router.actions';
import { selectModelOrganizations, selectModelSites } from '../../core/selectors/model.selectors';
import { HeaderOptions, Organization, SidenavOptions, Site } from '../../shared/models';

export const selectOrganizationDashboardSidenavOptions = createSelector(
  selectModelSites,
  (sites: Site[]): SidenavOptions[] => sites && sites.reduce(
    (options, site) =>
      [
        ...options,
        new SidenavOptions(
          'Check in',
          'done',
          new RouterActions.Go({ path: [`team/volunteers/check-in`] }),
        ),
        new SidenavOptions(
          'Check out',
          'done_all',
          new RouterActions.Go({ path: [`team/volunteers/check-out`] }),
        ),
      ],
    [],
  ),
);
