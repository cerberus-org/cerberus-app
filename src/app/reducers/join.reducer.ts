import * as JoinActions from '../actions/join.actions';
import {Organization} from '../models/organization';

export interface State {
  organizations: Organization[];
}

export const initialState: State = {
  organizations: null,
};

export type Action = JoinActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case JoinActions.LOAD_DATA_SUCCESS: {
      return Object.assign({}, state, {
        organizations: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
