import { Member, Organization } from '../../../models';
import { Credentials } from '../../../models/credentials';
import * as JoinOrganizationActions from '../actions/join-organization.actions';

export interface JoinOrganizationReducerState {
  validOrganization: Organization;
  validCredentials: Credentials;
  validMember: Member;
}

export const initialJoinOrganizationState: JoinOrganizationReducerState = {
  validOrganization: null,
  validCredentials: null,
  validMember: null,
};

export type Action = JoinOrganizationActions.All;

export function joinOrganizationReducer(
  state = initialJoinOrganizationState,
  action: Action,
): JoinOrganizationReducerState {
  switch (action.type) {
    case JoinOrganizationActions.SET_VALID_MEMBER_AND_USER_INFO: {
      const { member, credentials } = action.payload.userFormChanges;
      return { ...state, validMember: member, validCredentials: credentials };
    }

    case JoinOrganizationActions.SET_VALID_ORGANIZATION: {
      const { organization } = action.payload;
      return { ...state, validOrganization: organization };
    }

    default: {
      return state;
    }
  }
}
