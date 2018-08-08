import { sortVisitsByStartedAt } from '../../shared/helpers';
import { Member, Organization, Site, Visit, Volunteer } from '../../shared/models';
import * as ModelActions from '../actions/model.actions';

export interface ModelReducerState {
  sites: Site[];
  members: Member[];
  visits: Visit[];
  volunteers: Volunteer[];
  organizations: Organization[];
  selectedTeamId: string;
}

export const initialModelReducerState: ModelReducerState = {
  sites: null,
  members: null,
  visits: null,
  volunteers: null,
  organizations: null,
  selectedTeamId: null,
};

export type Action = ModelActions.All;

export function modelReducer(state = initialModelReducerState, action: Action): ModelReducerState {
  switch (action.type) {
    case ModelActions.LOAD_SITES_SUCCESS: {
      return {
        ...state,
        sites: action.payload,
      };
    }

    case ModelActions.LOAD_MEMBERS_SUCCESS: {
      return {
        ...state,
        members: action.payload,
      };
    }

    case ModelActions.LOAD_VISITS_SUCCESS: {
      return {
        ...state,
        visits: sortVisitsByStartedAt(action.payload),
      };
    }

    case ModelActions.LOAD_VOLUNTEERS_SUCCESS: {
      return {
        ...state,
        volunteers: action.payload,
      };
    }

    case ModelActions.LOAD_ORGANIZATIONS_SUCCESS: {
      return {
        ...state,
        organizations: action.payload,
      };
    }

    case ModelActions.SELECT_TEAM: {
      return {
        ...state,
        selectedTeamId: action.payload.teamId,
      };
    }

    default: {
      return state;
    }
  }
}
