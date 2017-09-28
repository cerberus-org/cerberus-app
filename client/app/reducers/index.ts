import { ActionReducerMap } from '@ngrx/store';
import * as fromLocation from './location.reducer';
import * as fromOrganization from './organization.reducer';
import * as fromVisit from './visit.reducer';
import * as fromVolunteer from './volunteer.reducer';
import * as fromUser from './user.reducer';

export interface State {
  locations: fromLocation.State;
  organizations: fromOrganization.State;
  visits: fromVisit.State;
  volunteers: fromVolunteer.State;
  users: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  locations: fromLocation.locationReducer,
  organizations: fromOrganization.organizationReducer,
  visits: fromVisit.visitReducer,
  volunteers: fromVolunteer.volunteerReducer,
  users: fromUser.userReducer
};
