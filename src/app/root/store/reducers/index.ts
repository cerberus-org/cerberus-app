import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { appReducer, AppReducerState } from './app.reducer';
import { modelReducer, ModelReducerState } from './model.reducer';

export interface RootState {
  app: AppReducerState;
  model: ModelReducerState;
  router: RouterReducerState;
}

export const rootReducers: ActionReducerMap<RootState> = {
  app: appReducer,
  model: modelReducer,
  router: routerReducer,
};
