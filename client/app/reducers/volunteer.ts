import { Action } from '@ngrx/store';
import { Volunteer } from '../models/volunteer';

export const LOAD_VOLUNTEERS = 'LOAD_VOLUNTEERS';
export const ADD_VOLUNTEER = 'ADD_VOLUNTEER';
export const MODIFY_VOLUNTEER = 'MODIFY_VOLUNTEER';

export default function VolunteerReducer(state: Volunteer[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_VOLUNTEERS':
      return action.payload.reverse();
    case 'ADD_VOLUNTEER':
      return [action.payload, ...state];
    case 'MODIFY_VOLUNTEER':
      return state.map(volunteer => {
        return volunteer._id === action.payload._id ? action.payload : volunteer;
      });
    default:
      return state;
  }
}

