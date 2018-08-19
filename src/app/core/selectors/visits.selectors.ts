import { createFeatureSelector, createSelector } from '@ngrx/store';
import { visitsAdapter, VisitsReducerState } from '../reducers/visits.reducer';
import { getSelectedSiteId } from './sites.selectors';
import { getSelectedTeamId, getTeamsReducerState } from './teams.selectors';

export const getVisitsReducerState = createFeatureSelector<VisitsReducerState>('visits');

export const {
  selectAll: getAllVisits,
} = visitsAdapter.getSelectors(getVisitsReducerState);

export const getVisitsForSelectedTeam = createSelector(
  getAllVisits,
  getSelectedTeamId,
  (visits, teamId) => visits.filter(visit => visit.teamId === teamId),
);

export const getVisitsForSelectedTeamAndSite = createSelector(
  getVisitsForSelectedTeam,
  getSelectedSiteId,
  (visits, siteId) => visits.filter(visit => siteId ? visit.siteId === siteId : !visit.siteId),
);
