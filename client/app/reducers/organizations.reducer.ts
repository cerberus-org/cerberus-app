import { Organization } from '../models/organization';
import * as OrganizationActions from '../actions/organizations.actions'

export interface State {
  organizations: Organization[];
}

export const initialState: State = {
  organizations: []
};

export type Action = OrganizationActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case OrganizationActions.LOAD: {
      return {
        organizations: action.payload
      };
    }

    case OrganizationActions.ADD: {
      return {
        organizations: [action.payload, ...state.organizations]
      };
    }

    case OrganizationActions.MODIFY: {
      return {
        organizations: state.organizations.map(organization => {
          return organization._id === action.payload._id ? action.payload : organization;
        })
      };
    }

    default: {
      return state;
    }
  }
}
