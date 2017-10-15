import { ActionReducerMap } from '@ngrx/store';
import * as fromSite from './sites.reducer';
import * as fromOrganization from './organizations.reducer';
import * as fromVisit from './visits.reducer';
import * as fromVolunteer from './volunteers.reducer';
import * as fromUser from './users.reducer';

import * as fromCheckIn from './check-in.reducer';
import * as fromDataDisplay from './data-display.reducer';
import * as fromGettingStarted from './getting-started.reducer';

export interface State {
  sites: fromSite.State;
  organizations: fromOrganization.State;
  visits: fromVisit.State;
  volunteers: fromVolunteer.State;
  users: fromUser.State;
  checkIn: fromCheckIn.State;
  dataDisplay: fromDataDisplay.State;
  gettingStarted: fromGettingStarted.State;
}

export const reducers: ActionReducerMap<State> = {
  // Model
  sites: fromSite.reducer,
  organizations: fromOrganization.reducer,
  visits: fromVisit.reducer,
  volunteers: fromVolunteer.reducer,
  users: fromUser.reducer,
  // UI
  checkIn: fromCheckIn.reducer,
  dataDisplay: fromDataDisplay.reducer,
  gettingStarted: fromGettingStarted.reducer
};
