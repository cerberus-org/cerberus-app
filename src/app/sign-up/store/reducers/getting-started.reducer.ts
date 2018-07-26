import { Member, Organization } from '../../../core/models';
import { Credentials } from '../../../core/models/credentials';
import * as GettingStartedActions from '../actions/getting-started.actions';

export interface GettingStartedReducerState {
  maxVisitedStep: number;
  joinExistingOrganization: boolean;
  validOrganization: Organization;
  validCredentials: Credentials;
  validMember: Member;
  tosIsChecked: boolean;
}

export const initialGettingStartedReducerState: GettingStartedReducerState = {
  maxVisitedStep: 0,
  joinExistingOrganization: false,
  validOrganization: null,
  validCredentials: null,
  validMember: null,
  tosIsChecked: false,
};

export type Action = GettingStartedActions.All;

export function gettingStartedReducer(
  state = initialGettingStartedReducerState,
  action: Action,
): GettingStartedReducerState {
  switch (action.type) {
    /**
     * Sets the selected tab to the next maxVisitedStep and only updates state.maxVisitedStep
     * if the next maxVisitedStep is greater than the previous.
     * action.payload - the next maxVisitedStep
     */
    case GettingStartedActions.NEXT_STEP: {
      return { ...state, maxVisitedStep: Math.max(state.maxVisitedStep, action.payload) };
    }

    /**
     * Sets the selected tab to the next maxVisitedStep and only updates state.maxVisitedStep
     * if the next maxVisitedStep is greater than the previous.
     * action.payload - the next maxVisitedStep
     */
    case GettingStartedActions.SET_JOIN_EXISTING_ORGANIZATION: {
      return { ...state, joinExistingOrganization: action.payload, validOrganization: null };
    }

    /**
     * Updates the valid organization.
     * action.payload - the valid organization
     */
    case GettingStartedActions.SET_VALID_ORGANIZATION: {
      return { ...state, validOrganization: action.payload };
    }

    /**
     * Updates the valid credentials and member.
     * action.payload - the valid credentials and member
     */
    case GettingStartedActions.SET_VALID_MEMBER_AND_USER_INFO: {
      const { credentials, member } = action.payload;
      return { ...state, validCredentials: credentials, validMember: member };
    }

    /**
     * Updates the TOS checked status.
     * action.payload - the checked state
     */
    case GettingStartedActions.SET_TOS_CHECKED: {
      return { ...state, tosIsChecked: action.payload };
    }

    default: {
      return state;
    }
  }
}
