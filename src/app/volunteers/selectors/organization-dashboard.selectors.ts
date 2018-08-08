import { createSelector } from '@ngrx/store';
import { getSelectedTeam } from '../../core/selectors/model.selectors';
import { HeaderOptions, Team } from '../../shared/models';

export const getOrganizationDashboardHeaderOptions = createSelector(
  getSelectedTeam,
  (team: Team): HeaderOptions => ({
    title: !!team ? team.name : 'Team missing!',
    previousUrl: null,
    showLogOut: false,
  }),
);
