import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { layoutReducer, LayoutReducerState } from './layout.reducer';
import { modelReducer, ModelReducerState } from './model.reducer';

export interface AppState {
  layout: LayoutReducerState;
  model: ModelReducerState;
  router: RouterReducerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  model: modelReducer,
  router: routerReducer,
};
