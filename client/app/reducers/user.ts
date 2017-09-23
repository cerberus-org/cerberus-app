import { Action } from '@ngrx/store';
import { User } from '../models/user';

export const LOAD_USERS = 'LOAD_USERS';
export const ADD_USER = 'ADD_USER';
export const MODIFY_USER = 'MODIFY_USER';

export function userReducer(state: User[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_USERS':
      return action.payload.reverse();
    case 'ADD_USER':
      return [action.payload, ...state];
    case 'MODIFY_USER':
      return state.map(user => {
        return user._id === action.payload._id ? action.payload : user;
      });
    default:
      return state;
  }
}

