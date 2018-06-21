import { Organization, User } from '../../../models';
import * as GettingStartedActions from '../actions/getting-started.actions';

export interface GettingStartedReducerState {
  maxVisitedStep: number;
  validOrganization: Organization;
  validUser: User;
  tosIsChecked: boolean;
}

export const initialState: GettingStartedReducerState = {
  maxVisitedStep: 0,
  validOrganization: null,
  validUser: null,
  tosIsChecked: false,
};

export type Action = GettingStartedActions.All;

export function gettingStartedReducer(state = initialState, action: Action): GettingStartedReducerState {
  switch (action.type) {

    /**
     * Sets the selected tab to the next maxVisitedStep and only updates state.maxVisitedStep
     * if the next maxVisitedStep is greater than the previous.
     * action.payload - the next maxVisitedStep
     */
    case GettingStartedActions.NEXT_STEP: {
      const next = action.payload;
      return { ...state, maxVisitedStep: Math.max(state.maxVisitedStep, next) };
    }

    /**
     * Updates the valid organization.
     * action.payload - the valid organization
     */
    case GettingStartedActions.UPDATE_VALID_ORGANIZATION: {
      return { ...state, validOrganization: action.payload };
    }

    /**
     * Updates the valid user.
     * action.payload - the valid user
     */
    case GettingStartedActions.UPDATE_VALID_USER: {
      return { ...state, validUser: action.payload };
    }

    /**
     * Updates the TOS checked status.
     * action.payload - the valid user
     */
    case GettingStartedActions.UPDATE_TOS_CHECKED: {
      return { ...state, tosIsChecked: action.payload };
    }

    default: {
      return state;
    }
  }
}
