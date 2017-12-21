import * as AppActions from '../actions/app.actions';

export interface State {
  menu: string[];
}

export const initialState: State = {
  menu: []
};

export type Action = AppActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case AppActions.SET_MENU: {
      return Object.assign({}, state, { menu: action.payload });
    }

    default: {
      return state;
    }
  }
}
