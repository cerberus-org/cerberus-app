import { Organization } from '../models/organization';
import * as organizations from '../actions/organizations.actions'

export interface State {
  organizations: Organization[];
}

export const initialState: State = {
  organizations: []
};

export function organizationReducer(state = initialState, action: organizations.Actions): State {
  switch (action.type) {
    case organizations.LOAD: {
      return {
        organizations: action.payload
      };
    }

    case organizations.ADD: {
      return {
        organizations: [action.payload, ...state.organizations]
      };
    }

    case organizations.MODIFY: {
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
