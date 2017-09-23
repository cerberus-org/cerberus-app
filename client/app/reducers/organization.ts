import { Action } from '@ngrx/store';
import { Organization } from '../models/organization';

export const LOAD_ORGANIZATIONS = 'LOAD_ORGANIZATIONS';
export const ADD_ORGANIZATION = 'ADD_ORGANIZATION';
export const MODIFY_ORGANIZATION = 'MODIFY_ORGANIZATION';

export function organizationReducer(state: Organization[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_ORGANIZATIONS':
      return action.payload;
    case 'ADD_ORGANIZATION':
      return [action.payload, ...state];
    case 'MODIFY_ORGANIZATION':
      return state.map(organization => {
        return organization._id === action.payload._id ? action.payload : organization;
      });
    default:
      return state;
  }
}
