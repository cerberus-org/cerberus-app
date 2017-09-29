import { Location } from '../models/location';
import * as locations from '../actions/locations.actions'

export interface State {
  locations: Location[];
}

export const initialState: State = {
  locations: []
};

export function locationReducer(state = initialState, action: locations.Actions): State {
  switch (action.type) {
    case locations.LOAD: {
      return {
        locations: action.payload
      };
    }

    case locations.ADD: {
      return {
        locations: [action.payload, ...state.locations]
      };
    }

    case locations.MODIFY: {
      return {
        locations: state.locations.map(location => {
          return location._id === action.payload._id ? action.payload : location;
        })
      };
    }

    default: {
      return state;
    }
  }
}
