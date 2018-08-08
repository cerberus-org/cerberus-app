import { createSelector } from '@ngrx/store';
import { getSelectedTeam, selectModelVisits, selectModelVolunteers } from '../../core/selectors/model.selectors';
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
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): CheckInContainerState => ({
    visits,
    volunteers,
  }),
);
