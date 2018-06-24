import { createSelector } from '@ngrx/store';
import { selectSessionOrganization } from '../../../auth/store/selectors/session.selectors';
import { HeaderOptions, Organization, Visit, Volunteer } from '../../../models';
import { selectModelVisits, selectModelVolunteers } from '../../../root/store/selectors/model.selectors';
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
  sessionOrganizationId: string;
}

export const selectCheckInHeaderOptions = createSelector(
  selectSessionOrganization,
  (organization: Organization): HeaderOptions => organization
    ? new HeaderOptions(
      organization.name,
      'business',
      'dashboard',
      true,
    )
    : null,
);

export const selectCheckInContainerState = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  selectSessionOrganization,
  (visits: Visit[], volunteers: Volunteer[], organization: Organization): CheckInContainerState => ({
    visits,
    volunteers,
    sessionOrganizationId: organization.id,
  }),
);
