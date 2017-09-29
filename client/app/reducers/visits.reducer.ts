import { Visit } from '../models/visit';
import * as visits from '../actions/visits.actions'

export interface State {
  visits: Visit[];
}

export const initialState: State = {
  visits: []
};

export function visitReducer(state = initialState, action: visits.Actions): State {
  switch (action.type) {
    case visits.LOAD: {
      return {
        visits: filterInvalidVisits(action.payload, 8).reverse()
      };
    }

    case visits.ADD: {
      return {
        visits: [action.payload, ...state.visits]
      };
    }

    case visits.MODIFY: {
      return {
        visits: state.visits.map(visit => {
          return visit._id === action.payload._id ? action.payload : visit;
        })
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Filter out invalid visits. Any visits that have a visit greater than maxHours will be considered invalid.
 * @param visitsArr
 * @param maxHours
 * @return {Visit[]}
 */
const filterInvalidVisits = (visitsArr: Visit[], maxHours: number): Visit[] => {
  let hours = 0;
  return visitsArr.filter(visit => {
    // if the visit is still ongoing
    hours = visit.endedAt === null
      // load current visit hours
      ? Math.abs(visit.startedAt.getTime() - new Date().getTime()) / 3600000
      // if the visit is completed
      : hours = Math.abs(visit.startedAt.getTime() - visit.endedAt.getTime()) / 3600000;
    return hours <= maxHours;
  });
};
