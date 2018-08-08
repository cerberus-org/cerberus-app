import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer, LayoutReducerState } from './layout.reducer';
import * as fromMembers from './members.reducer';
import { modelReducer, ModelReducerState } from './model.reducer';
import * as fromTeams from './teams.reducer';
import * as fromVisits from './visits.reducer';

export interface AppState {
  layout: LayoutReducerState;
  model: ModelReducerState;
  router: RouterReducerState;
  members: fromMembers.State;
  teams: fromTeams.State;
  visits: fromVisits.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  model: modelReducer,
  router: routerReducer,
  members: fromMembers.reducer,
  teams: fromTeams.reducer,
  visits: fromVisits.reducer,
};
