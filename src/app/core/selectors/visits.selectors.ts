import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromVisits from '../reducers/visits.reducer';
import { getSelectedTeamId } from './teams.selectors';

export const getVisitsReducerState = createFeatureSelector<fromVisits.State>('visits');

export const {
  selectAll: getAllVisits,
} = fromVisits.adapter.getSelectors(getVisitsReducerState);

export const getVisitsForSelectedTeam = createSelector(
  getAllVisits,
  getSelectedTeamId,
  (visits, teamId) => visits.filter(visit => visit.organizationId === teamId),
);
