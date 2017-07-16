import { ActionReducer, Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const ADD_VISITS = 'ADD_VISITS';
export const ADD_VISIT = 'ADD_VISIT';

export const visitReducer = (state: Visit[] = [], action: Action) =>  {
  switch (action.type) {
    case 'ADD_VISITS':
      return action.payload;
    case 'ADD_VISIT':
      return [action.payload, ...state];
    default:
      return state;
  }
};

