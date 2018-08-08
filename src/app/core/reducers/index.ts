import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer, LayoutReducerState } from './layout.reducer';
import { membersReducer, MembersReducerState } from './members.reducer';
import { modelReducer, ModelReducerState } from './model.reducer';
import { teamsReducer, TeamsReducerState } from './teams.reducer';
import { visitsReducer, VisitsReducerState } from './visits.reducer';

export interface AppState {
  layout: LayoutReducerState;
  model: ModelReducerState;
  router: RouterReducerState;
  members: MembersReducerState;
  teams: TeamsReducerState;
  visits: VisitsReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  model: modelReducer,
  router: routerReducer,
  members: membersReducer,
  teams: teamsReducer,
  visits: visitsReducer,
};
