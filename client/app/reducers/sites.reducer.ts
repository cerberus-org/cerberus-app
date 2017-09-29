import { Site } from '../models/site';
import * as SiteActions from '../actions/sites.actions'

export interface State {
  sites: Site[];
}

export const initialState: State = {
  sites: []
};

export type Action = SiteActions.All;

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case SiteActions.LOAD: {
      return {
        sites: action.payload
      };
    }

    case SiteActions.ADD: {
      return {
        sites: [action.payload, ...state.sites]
      };
    }

    case SiteActions.MODIFY: {
      return {
        sites: state.sites.map(site => {
          return site._id === action.payload._id ? action.payload : site;
        })
      };
    }

    default: {
      return state;
    }
  }
}
