import { createFeatureSelector, createSelector } from '@ngrx/store';
import { sitesAdapter, SitesReducerState } from '../reducers/sites.reducer';
import { getSelectedTeamId } from './teams.selectors';

export const getSitesReducerState = createFeatureSelector<SitesReducerState>('sites');

export const {
  selectAll: getAllSites,
  selectEntities: getSiteEntities,
} = sitesAdapter.getSelectors(getSitesReducerState);

export const getSitesForSelectedTeam = createSelector(
  getAllSites,
  getSelectedTeamId,
  (sites, teamId) => sites.filter(site => site.teamId === teamId),
);
