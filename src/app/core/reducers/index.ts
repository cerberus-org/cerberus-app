import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer, LayoutReducerState } from './layout.reducer';
import { membersReducer, MembersReducerState } from './members.reducer';
import { usersReducer, UsersReducerState } from './users.reducer';
import { sitesReducer, SitesReducerState } from './sites.reducer';
import { teamsReducer, TeamsReducerState } from './teams.reducer';
import { visitsReducer, VisitsReducerState } from './visits.reducer';
import { volunteersReducer, VolunteersReducerState } from './volunteers.reducer';

export interface AppState {
  layout: LayoutReducerState;
  router: RouterReducerState;
  members: MembersReducerState;
  users: UsersReducerState;
  sites: SitesReducerState;
  teams: TeamsReducerState;
  visits: VisitsReducerState;
  volunteers: VolunteersReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  router: routerReducer,
  members: membersReducer,
  users: usersReducer,
  sites: sitesReducer,
  teams: teamsReducer,
  visits: visitsReducer,
  volunteers: volunteersReducer,
};
