import { Visit } from '../models/visit';
import * as VisitActions from '../actions/visits.actions'
import { Volunteer } from '../models/volunteer';

export interface State {
  visits: Visit[];
  selected: Visit;
}

export const initialState: State = {
  visits: [],
  selected: null
};

export type Action = VisitActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case VisitActions.LOAD_SUCCESS: {
      return Object.assign({}, initialState, {
        visits: filterInvalidVisits(action.payload, 8).reverse()
      });
    }

    case VisitActions.ADD: {
      return Object.assign({}, state, {
        visits: [action.payload, ...state.visits]
      });
    }

    case VisitActions.MODIFY: {
      return Object.assign({}, state, {
        visits: state.visits.map(visit => {
          return visit._id === action.payload._id ? action.payload : visit;
        })
      });
    }

    case VisitActions.SELECT_ACTIVE_FOR_VOLUNTEER: {
      const volunteer: Volunteer = action.payload;
      return Object.assign({}, state, {
        selected: volunteer
          ? state.visits.find(visit => visit.endedAt === null && volunteer._id === visit.volunteerId)
          : null
      });
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
