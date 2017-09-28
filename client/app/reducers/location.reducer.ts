import { Location } from '../models/location';
import * as LocationActions from '../actions/location.actions'

export interface State {
  locations: Location[];
}

const initialState: State = {
  locations: []
};

export type Action = LocationActions.All;

export function locationReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case LocationActions.LOAD: {
      return {
        locations: action.payload
      };
    }

    case LocationActions.ADD: {
      return {
        locations: [action.payload, ...state.locations]
      };
    }

    case LocationActions.MODIFY: {
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
