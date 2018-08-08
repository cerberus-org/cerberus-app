import { HeaderOptions, SidenavOptions } from '../../shared/models';
import { LayoutActionsUnion, LayoutActionTypes } from '../actions/layout.actions';

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

export function layoutReducer(state = initialLayoutReducerState, action: LayoutActionsUnion): LayoutReducerState {
  switch (action.type) {
    case LayoutActionTypes.SetHeaderOptions: {
      return {
        ...state,
        headerOptions: action.payload,
      };
    }

    case LayoutActionTypes.SetSidenavOptions: {
      return {
        ...state,
        sidenavOptions: action.payload,
      };
    }

    case LayoutActionTypes.SetSidenavOpened: {
      return {
        ...state,
        sidenavOpened: action.payload,
      };
    }

    case LayoutActionTypes.ToggleSidenavOpened: {
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
