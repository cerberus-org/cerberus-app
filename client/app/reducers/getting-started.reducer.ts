import * as GettingStartedActions from '../actions/getting-started.actions'
import { MdTabGroup } from '@angular/material';

export interface State {
  tabGroup: MdTabGroup;
}

export const initialState: State = {
  tabGroup: null
};

export type Action = GettingStartedActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case GettingStartedActions.LOAD_TAB_GROUP: {
      return Object.assign({}, state, { tabGroup: action.payload});
    }

    default: {
      return state;
    }
  }
}
