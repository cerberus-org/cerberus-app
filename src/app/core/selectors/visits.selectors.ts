import { createFeatureSelector, createSelector } from '@ngrx/store';
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
