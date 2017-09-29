import { ActionReducerMap } from '@ngrx/store';
import * as fromLocation from './locations.reducer';
import * as fromOrganization from './organizations.reducer';
import * as fromVisit from './visits.reducer';
import * as fromVolunteer from './volunteers.reducer';
import * as fromUser from './users.reducer';

export interface State {
  locations: fromLocation.State;
  organizations: fromOrganization.State;
  visits: fromVisit.State;
  volunteers: fromVolunteer.State;
  users: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  locations: fromLocation.reducer,
  organizations: fromOrganization.reducer,
  visits: fromVisit.reducer,
  volunteers: fromVolunteer.reducer,
  users: fromUser.reducer
};
