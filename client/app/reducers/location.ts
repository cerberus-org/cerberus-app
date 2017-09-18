import { Action } from '@ngrx/store';
import { Location } from '../models/location';

export const LOAD_LOCATIONS = 'LOAD_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const MODIFY_LOCATION = 'MODIFY_LOCATION';

export function locationReducer(state: Location[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_LOCATIONS':
      return action.payload.reverse();
    case 'ADD_LOCATION':
      return [action.payload, ...state];
    case 'MODIFY_LOCATION':
      return state.map(location => {
        return location._id === action.payload._id ? action.payload : location;
      });
    default:
      return state;
  }
}
