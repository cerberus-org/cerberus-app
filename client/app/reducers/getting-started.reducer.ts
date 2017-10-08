import * as GettingStartedActions from '../actions/getting-started.actions'
import { MdTabGroup } from '@angular/material';

export interface State {
  tabGroup: MdTabGroup;
  step: number;
}

export const initialState: State = {
  tabGroup: null,
  step: 0
};

export type Action = GettingStartedActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case GettingStartedActions.LOAD_TAB_GROUP: {
      return Object.assign({}, state, {
        tabGroup: action.payload
      });
    }

    case GettingStartedActions.NEXT_STEP: {
      const next = action.payload;
      state.tabGroup.selectedIndex = next;
      return Object.assign({}, state, {
        step: nextStep(state.step, next)
      });
    }

    default: {
      return state;
    }
  }
}

const nextStep = (previous, next): number => {
  return next > previous ? next : previous;
};
