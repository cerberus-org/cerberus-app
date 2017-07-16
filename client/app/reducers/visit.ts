import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const LOAD_VISITS = 'LOAD_VISITS';
export const ADD_VISIT = 'ADD_VISIT';
export const MODIFY_VISIT = 'MODIFY_VISIT';

export const visitReducer = (state: Visit[] = [], action: Action) =>  {
  switch (action.type) {
    case 'LOAD_VISITS':
      return action.payload;
    case 'ADD_VISIT':
      return [action.payload, ...state];
    case 'MODIFY_VISIT':
      const modified = action.payload;
      const index = state.findIndex(visit => visit._id === modified._id);
      state[index] = modified;
      return state;
    default:
      return state;
  }
};

