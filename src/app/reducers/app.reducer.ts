///<reference path="../actions/app.actions.ts"/>
import * as AppActions from '../actions/app.actions';
import { HeaderOptions } from '../models/header-options';
import { SidenavOptions } from '../models/sidenav-options';

export interface State {
  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
  user: any;
}

export const initialState: State = {
  headerOptions: null,
  sidenavOptions: null,
  user: null,
};

export type Action = AppActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case AppActions.SET_HEADER_OPTIONS: {
      return Object.assign({}, state, {
        headerOptions: action.payload,
      });
    }

    case AppActions.SET_SIDENAV_OPTIONS: {
      return Object.assign({}, state, {
        sidenavOptions: action.payload
      });
    }

    case AppActions.SET_USER_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
