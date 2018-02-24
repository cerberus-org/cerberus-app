import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as fromCheckIn from './check-in.reducer';
import * as fromGettingStarted from './getting-started.reducer';
import * as fromModel from './model.reducer';
import * as fromSettings from './settings.reducer';

export interface State {
  checkIn: fromCheckIn.State;
  gettingStarted: fromGettingStarted.State;
  model: fromModel.State;
  settings: fromSettings.State;
  router: fromRouter.RouterReducerState;
  app: fromApp.State;
}

export const reducers: ActionReducerMap<State> = {
  checkIn: fromCheckIn.reducer,
  gettingStarted: fromGettingStarted.reducer,
  model: fromModel.reducer,
  settings: fromSettings.reducer,
  router: fromRouter.routerReducer,
  app: fromApp.reducer,
};
