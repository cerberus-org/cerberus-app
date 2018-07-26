import { createSelector } from '@ngrx/store';
import { selectSessionOrganization } from '../../auth/selectors/session.selectors';
import { selectModelVisits, selectModelVolunteers } from '../../core/selectors/model.selectors';
import { HeaderOptions, Organization, Visit, Volunteer } from '../../shared/models';
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

export const selectCheckInHeaderOptions = createSelector(
  selectSessionOrganization,
  (organization: Organization): HeaderOptions =>
    new HeaderOptions(
      !!organization ? organization.name : 'Organization missing!',
      'business',
      'dashboard',
      true,
    ),
);

export const selectCheckInContainerState = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): CheckInContainerState => ({
    visits,
    volunteers,
  }),
);
