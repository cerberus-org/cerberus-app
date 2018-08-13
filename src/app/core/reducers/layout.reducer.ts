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
      const { headerOptions } = action.payload;
      return { ...state, headerOptions };
    }

    case LayoutActionTypes.SetSidenavOptions: {
      const { sidenavOptions } = action.payload;
      return { ...state, sidenavOptions };
    }

    case LayoutActionTypes.SetSidenavOpened: {
      const { sidenavOpened } = action.payload;
      return { ...state, sidenavOpened };
    }

    case LayoutActionTypes.ToggleSidenavOpened: {
      return { ...state, sidenavOpened: !state.sidenavOpened };
    }

    default: {
      return state;
    }
  }
}
