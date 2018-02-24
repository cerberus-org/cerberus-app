import * as CheckInActions from '../actions/check-in.actions';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export interface State {
  selectedTabIndex: number,
  visits: Visit[];
  volunteers: Volunteer[];
}

export const initialState: State = {
  selectedTabIndex: 0,
  visits: [],
  volunteers: []
};

export type Action = CheckInActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case CheckInActions.SUBMIT_NEW_VOLUNTEER_SUCCESS: {
      return Object.assign({}, state, {
        selectedTabIndex: 0
      });
    }

    case CheckInActions.CHECK_IN_OR_OUT_SUCCESS: {
      return state;
    }

    default: {
      return state;
    }
  }
}
