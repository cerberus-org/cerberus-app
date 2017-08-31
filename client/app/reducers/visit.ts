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
 *
 * @param visits
 * @return {Visit[]}
 */
function getValidVisits (visits: Visit[]): Visit[] {
  // visits to discard
  const invalidVisits: Visit[] = new Array();
  // visits to return
  const validVisits = visits.filter(function(visit){
    // if the visit is still ongoing
    if (visit.endedAt === null) {
      // get current visit hours
      const hours = Math.abs(visit.startedAt.getTime() - new Date().getTime()) / 3600000;
      if (hours > maxHours) {
        invalidVisits.push(visit);
      } else {
        // if the visit is valid keep it
        return true;
      }
    } else {
      // if the visit is complete keep it
      return true;
    }
  });
  return validVisits;
}

