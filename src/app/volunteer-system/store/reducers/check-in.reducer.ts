import * as CheckInActions from '../actions/check-in.actions';

export interface CheckInReducerState {
  selectedTabIndex: number;
}

export const initialState: CheckInReducerState = {
  selectedTabIndex: 0,
};

export type Action = CheckInActions.All;

export function checkInReducer(state = initialState, action: Action): CheckInReducerState {

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
