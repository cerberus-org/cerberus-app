import { HeaderOptions, SidenavOptions } from '../../../models';
import * as LayoutActions from '../actions/layout.actions';

export interface LayoutReducerState {
  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
}

export const initialLayoutReducerState: LayoutReducerState = {
  headerOptions: null,
  sidenavOptions: [],
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

    default: {
      return state;
    }
  }
}
