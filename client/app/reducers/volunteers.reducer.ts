import { Volunteer } from '../models/volunteer';
import * as VolunteerActions from '../actions/volunteers.actions'

export interface State {
  volunteers: Volunteer[];
}

export const initialState: State = {
  volunteers: []
};

export type Action = VolunteerActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case VolunteerActions.LOAD: {
      return {
        volunteers: action.payload
      };
    }

    case VolunteerActions.ADD: {
      return {
        volunteers: [action.payload, ...state.volunteers]
      };
    }

    case VolunteerActions.MODIFY: {
      return {
        volunteers: state.volunteers.map(volunteer => {
          return volunteer._id === action.payload._id ? action.payload : volunteer;
        })
      };
    }

    default: {
      return state;
    }
  }
}
