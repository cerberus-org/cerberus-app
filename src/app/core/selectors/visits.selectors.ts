import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectedSiteId } from '../../volunteers/helpers/check-in.helpers';
import { visitsAdapter, VisitsReducerState } from '../reducers/visits.reducer';
import { getSelectedTeamId } from './teams.selectors';

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
  (visits) => visits.filter(visit => visit.siteId === getSelectedSiteId()),
);
