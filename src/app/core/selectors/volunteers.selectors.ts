import { createFeatureSelector, createSelector } from '@ngrx/store';
import { volunteersAdapter, VolunteersReducerState } from '../reducers/volunteers.reducer';
import { getSelectedTeamId } from './teams.selectors';

export const getVolunteersReducerState = createFeatureSelector<VolunteersReducerState>('volunteers');

export const {
  selectAll: getAllVolunteers,
} = volunteersAdapter.getSelectors(getVolunteersReducerState);

export const getVolunteersForSelectedTeam = createSelector(
  getAllVolunteers,
  getSelectedTeamId,
  (volunteers, teamId) => volunteers.filter(volunteer => volunteer.teamId === teamId),
);
