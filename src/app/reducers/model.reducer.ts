import * as ModelActions from '../actions/model.actions';
import { Visit } from '../models/visit';
import { Volunteer } from '../models/volunteer';

export interface State {
  visits: Visit[];
  volunteers: Volunteer[];
}

export const initialState: State = {
  visits: [],
  volunteers: []
};

export type Action = ModelActions.All;

export function reducer(state = initialState, action: Action): State {

  switch (action.type) {

    case ModelActions.LOAD_VISITS_SUCCESS: {
      return Object.assign({}, state, {
        visits: action.payload
          .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime()),
      });
    }

    case ModelActions.LOAD_VOLUNTEERS_SUCCESS: {
      return Object.assign({}, state, {
        volunteers: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
