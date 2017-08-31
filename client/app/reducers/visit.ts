import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const LOAD_VISITS = 'LOAD_VISITS';
export const ADD_VISIT = 'ADD_VISIT';
export const MODIFY_VISIT = 'MODIFY_VISIT';
const maxHours = 8;

export function visitReducer(state: Visit[] = [], action: Action) {
  switch (action.type) {
    case 'LOAD_VISITS':
      // Reverse to order from newest to oldest
      return getValidVisits(action.payload).reverse();
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

/**
 * Filter out invalid visits.
 * @param visits
 * @return {Visit[]}
 */
function getValidVisits (visits: Visit[]): Visit[] {
  let hours = 0;
  const validVisits = visits.filter(function(visit) {
    // if the visit is still ongoing
    if (visit.endedAt === null) {
      // get current visit hours
      hours = Math.abs(visit.startedAt.getTime() - new Date().getTime()) / 3600000;
    } else { // if the visit is completed
      hours = Math.abs(visit.startedAt.getTime() - visit.endedAt.getTime()) / 3600000;
    }
    if (hours > maxHours) {
      return false;
    } else { // if the visit is valid
      return true;
    }
  });
  return validVisits;
}

