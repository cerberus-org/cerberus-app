import { Member, Organization } from '../../shared/models';
import { Credentials } from '../../shared/models/credentials';
import * as SignUpActions from '../actions/sign-up.actions';

export interface SignUpReducerState {
  maxVisitedStep: number;
  joinExistingOrganization: boolean;
  validOrganization: Organization;
  validCredentials: Credentials;
  validMember: Member;
  tosIsChecked: boolean;
}

export const initialSignUpReducerState: SignUpReducerState = {
  maxVisitedStep: 0,
  joinExistingOrganization: false,
  validOrganization: null,
  validCredentials: null,
  validMember: null,
  tosIsChecked: false,
};

export type Action = SignUpActions.All;

export function signUpReducer(
  state = initialSignUpReducerState,
  action: Action,
): SignUpReducerState {
  switch (action.type) {
    /**
     * Sets the selected tab to the next maxVisitedStep and only updates state.maxVisitedStep
     * if the next maxVisitedStep is greater than the previous.
     * action.payload - the next maxVisitedStep
     */
    case SignUpActions.NEXT_STEP: {
      return { ...state, maxVisitedStep: Math.max(state.maxVisitedStep, action.payload) };
    }

    /**
     * Sets the selected tab to the next maxVisitedStep and only updates state.maxVisitedStep
     * if the next maxVisitedStep is greater than the previous.
     * action.payload - the next maxVisitedStep
     */
    case SignUpActions.SET_JOIN_EXISTING_ORGANIZATION: {
      return { ...state, joinExistingOrganization: action.payload, validOrganization: null };
    }

    /**
     * Updates the valid organization.
     * action.payload - the valid organization
     */
    case SignUpActions.SET_VALID_ORGANIZATION: {
      return { ...state, validOrganization: action.payload };
    }

    /**
     * Updates the valid credentials and member.
     * action.payload - the valid credentials and member
     */
    case SignUpActions.SET_VALID_MEMBER_AND_USER_INFO: {
      const { credentials, member } = action.payload;
      return { ...state, validCredentials: credentials, validMember: member };
    }

    /**
     * Updates the TOS checked status.
     * action.payload - the checked state
     */
    case SignUpActions.SET_TOS_CHECKED: {
      return { ...state, tosIsChecked: action.payload };
    }

    default: {
      return state;
    }
  }
}
