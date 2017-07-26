import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const LOAD_VISITS = 'LOAD_VISITS';
export const ADD_VISIT = 'ADD_VISIT';
export const MODIFY_VISIT = 'MODIFY_VISIT';

export function visitReducer(state: Visit[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_VISITS':
      // Reverse to order from newest to oldest
      return action.payload.reverse();
    case 'ADD_VISIT':
      return [action.payload, ...state];
    case 'MODIFY_VISIT':
      return state.map(visit => {
        return visit._id === action.payload._id ? action.payload : visit;
      });
    default:
      return state;
  }
}

