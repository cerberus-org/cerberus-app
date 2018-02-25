import * as CheckInActions from '../actions/check-in.actions';

export interface State {
  selectedTabIndex: number;
}

export const initialState: State = {
  selectedTabIndex: 0,
};

export type Action = CheckInActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case CheckInActions.SUBMIT_NEW_VOLUNTEER_SUCCESS: {
      return Object.assign({}, state, {
        selectedTabIndex: 0,
      });
    }

    default: {
      return state;
    }
  }
}
