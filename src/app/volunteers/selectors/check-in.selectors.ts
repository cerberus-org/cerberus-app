import { createSelector } from '@ngrx/store';
import { getSelectedTeam } from '../../core/selectors/teams.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteersForSelectedTeam } from '../../core/selectors/volunteers.selectors';
import { HeaderOptions, Team, Visit, Volunteer } from '../../shared/models';
import { VolunteerSystemState } from '../reducers';
import { CheckInReducerState } from '../reducers/check-in.reducer';
import { selectVolunteerSystemState } from './volunteer-system.selectors';

export const selectCheckInReducerState = createSelector(
  selectVolunteerSystemState,
  (state: VolunteerSystemState) => state.checkIn,
);

export const selectSelectedTabIndex = createSelector(
  selectCheckInReducerState,
  (state: CheckInReducerState) => state.selectedTabIndex,
);

export interface CheckInContainerState {
  visits: Visit[];
  volunteers: Volunteer[];
}

export const getCheckInHeaderOptions = createSelector(
  getSelectedTeam,
  (team: Team): HeaderOptions => ({
    title: !!team ? team.name : 'Team missing!',
    previousUrl: 'dashboard',
    showLogOut: false,
  }),
);

export const selectCheckInContainerState = createSelector(
  getVisitsForSelectedTeam,
  getVolunteersForSelectedTeam,
  (visits: Visit[], volunteers: Volunteer[]): CheckInContainerState => ({
    visits,
    volunteers,
  }),
);
