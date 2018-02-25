import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as fromAuth from './auth.reducer';
import * as fromCheckIn from './check-in.reducer';
import * as fromGettingStarted from './getting-started.reducer';
import * as fromJoin from './join.reducer';
import * as fromModel from './model.reducer';
import * as fromSettings from './settings.reducer';

export interface State {
  app: fromApp.State;
  auth: fromAuth.State;
  checkIn: fromCheckIn.State;
  gettingStarted: fromGettingStarted.State;
  model: fromModel.State;
  router: fromRouter.RouterReducerState;
  settings: fromSettings.State;
  join: fromJoin.State;
}

export const reducers: ActionReducerMap<State> = {
  app: fromApp.reducer,
  auth: fromAuth.reducer,
  checkIn: fromCheckIn.reducer,
  gettingStarted: fromGettingStarted.reducer,
  model: fromModel.reducer,
  router: fromRouter.routerReducer,
  settings: fromSettings.reducer,
  join: fromJoin.reducer,
};
