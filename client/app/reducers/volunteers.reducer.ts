import { Volunteer } from '../models/volunteer';
import * as volunteers from '../actions/volunteers.actions'

export interface State {
  volunteers: Volunteer[];
}

const initialState: State = {
  volunteers: []
};

export function volunteerReducer(state = initialState, action: volunteers.Actions): State {
  switch (action.type) {
    case volunteers.LOAD: {
      return {
        volunteers: action.payload
      };
    }

    case volunteers.ADD: {
      return {
        volunteers: [action.payload, ...state.volunteers]
      };
    }

    case volunteers.MODIFY: {
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
