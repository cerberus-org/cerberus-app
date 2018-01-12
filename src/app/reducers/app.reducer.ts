///<reference path="../actions/app.actions.ts"/>
import * as AppActions from '../actions/app.actions';
import { HeaderOptions } from '../models/header-options';
import { Organization } from '../models/organization';
import { SidenavOptions } from '../models/sidenav-options';

export interface State {
  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
  user: any;
  organization: Organization;
}

export const initialState: State = {
  headerOptions: null,
  sidenavOptions: null,
  user: null,
  organization: null
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

    case AppActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        user: action.payload.user,
        organization: action.payload.organization
      });
    }

    case AppActions.SET_ORGANIZATION: {
      return Object.assign({}, state, {
        organization: action.payload
      });
    }

    case AppActions.SET_USER: {
      return Object.assign({}, state, {
        user: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
