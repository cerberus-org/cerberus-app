import { HeaderOptions, SidenavOptions } from '../../../models';
import * as AppActions from '../actions/app.actions';

export interface AppReducerState {
  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
}

export const initialState: AppReducerState = {
  headerOptions: null,
  sidenavOptions: [],
};

export type Action = AppActions.All;

export function appReducer(state = initialState, action: Action): AppReducerState {
  switch (action.type) {
    case AppActions.SET_HEADER_OPTIONS: {
      return Object.assign({}, state, {
        headerOptions: action.payload,
      });
    }

    case AppActions.SET_SIDENAV_OPTIONS: {
      return Object.assign({}, state, {
        sidenavOptions: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
