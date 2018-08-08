import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Team } from '../../shared/models';
import { TeamsPageActionsUnion, TeamsPageActionTypes } from '../actions/teams-page.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Team> {
  selectedTeam: Team;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records.
 */
export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>();

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedTeam: null,
});

export function reducer(state = initialState, action: TeamsPageActionsUnion): State {
  switch (action.type) {
    case TeamsPageActionTypes.LoadTeamsSuccess: {
      return adapter.addMany(action.payload.teams, state);
    }

    case TeamsPageActionTypes.SelectTeam: {
      return { ...state, selectedTeam: action.payload.team };
    }

    default: {
      return state;
    }
  }
}
