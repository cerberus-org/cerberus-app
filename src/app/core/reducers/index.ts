import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer, LayoutReducerState } from './layout.reducer';
import { membersReducer, MembersReducerState } from './members.reducer';
import { modelReducer, ModelReducerState } from './model.reducer';
import { sitesReducer, SitesReducerState } from './sites.reducer';
import { teamsReducer, TeamsReducerState } from './teams.reducer';
import { visitsReducer, VisitsReducerState } from './visits.reducer';
import { volunteersReducer, VolunteersReducerState } from './volunteers.reducer';

export interface AppState {
  layout: LayoutReducerState;
  model: ModelReducerState;
  router: RouterReducerState;
  members: MembersReducerState;
  sites: SitesReducerState;
  teams: TeamsReducerState;
  visits: VisitsReducerState;
  volunteers: VolunteersReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  model: modelReducer,
  router: routerReducer,
  members: membersReducer,
  sites: sitesReducer,
  teams: teamsReducer,
  visits: visitsReducer,
  volunteers: volunteersReducer,
};
