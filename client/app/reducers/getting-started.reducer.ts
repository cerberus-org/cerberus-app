import * as GettingStartedActions from '../actions/getting-started.actions'
import { MatTabGroup } from '@angular/material';
import { Organization } from '../models/organization';
import { User } from '../models/user';

export interface State {
  tabGroup: MatTabGroup;
  step: number;
  validOrganization: Organization
  validUser: User
}

export const initialState: State = {
  tabGroup: null,
  step: 0,
  validOrganization: null,
  validUser: null
};

export type Action = GettingStartedActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {

    /**
     * Loads the tabGroup.
     * action.payload - the tabGroup
     */
    case GettingStartedActions.LOAD_TAB_GROUP: {
      return Object.assign({}, state, {
        tabGroup: action.payload
      });
    }

    /**
     * Sets the selected tab to the next step and only updates state.step
     * if the next step is greater than the previous.
     * action.payload - the next step
     */
    case GettingStartedActions.NEXT_STEP: {
      const next = action.payload;
      state.tabGroup.selectedIndex = next;
      return Object.assign({}, state, {
        step: Math.max(state.step, next)
      });
    }

    /**
     * Updates the valid organization.
     * action.payload - the valid organization
     */
    case GettingStartedActions.UPDATE_VALID_ORGANIZATION: {
      return Object.assign({}, state, {
        validOrganization: action.payload
      });
    }

    /**
     * Updates the valid user.
     * action.payload - the valid user
     */
    case GettingStartedActions.UPDATE_VALID_USER: {
      return Object.assign({}, state, {
        validUser: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
