import * as AppActions from '../actions/app.actions';
import { HeaderOptions } from '../models/header-options';

export interface State {
  sideNavOptions: string[];
  headerOptions: HeaderOptions;
}

export const initialState: State = {
  sideNavOptions: null,
  headerOptions: null
};

export type Action = AppActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case AppActions.SET_PAGE_CONFIG: {
      return Object.assign({}, state, {
        sideNavOptions: action.payload.sideNavOptions,
        headerOptions: action.payload.headerOptions
      });
    }

    default: {
      return state;
    }
  }
}
