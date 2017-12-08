import { Visit } from '../models/visit';
import * as DataDisplayActions from '../actions/data-display.actions';

export interface State {
  visits: Visit[]
}

export const initialState: State = {
  visits: []
};

export type Action = DataDisplayActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    case DataDisplayActions.LOAD_DATA_SUCCESS: {
      // Sort visits by startedAt descending
      const visits = action.payload.slice()
        .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
      return { visits };
    }

    default: {
      return state;
    }
  }
}
