import { HeaderOptions, SidenavOptions } from '../../../models';
import * as LayoutActions from '../actions/layout.actions';

export interface LayoutReducerState {
  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
  sidenavOpened: boolean;
}

export const initialLayoutReducerState: LayoutReducerState = {
  headerOptions: null,
  sidenavOptions: [],
  sidenavOpened: false,
};

export type Action = LayoutActions.All;

export function layoutReducer(state = initialLayoutReducerState, action: Action): LayoutReducerState {
  switch (action.type) {
    case LayoutActions.SET_HEADER_OPTIONS: {
      return {
        ...state,
        headerOptions: action.payload,
      };
    }

    case LayoutActions.SET_SIDENAV_OPTIONS: {
      return {
        ...state,
        sidenavOptions: action.payload,
      };
    }

    case LayoutActions.SET_SIDENAV_OPENED: {
      return {
        ...state,
        sidenavOpened: action.payload,
      };
    }

    case LayoutActions.TOGGLE_SIDENAV_OPENED: {
      return {
        ...state,
        sidenavOpened: !state.sidenavOpened,
      };
    }

    default: {
      return state;
    }
  }
}
