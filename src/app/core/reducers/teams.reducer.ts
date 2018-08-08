import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Team } from '../../shared/models';
import { TeamsActionsUnion, TeamsActionTypes } from '../actions/teams.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface TeamsReducerState extends EntityState<Team> {
  selectedTeamId: string;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records.
 */
export const teamsAdapter: EntityAdapter<Team> = createEntityAdapter<Team>();

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: TeamsReducerState = teamsAdapter.getInitialState({
  selectedTeamId: null,
});

export function teamsReducer(state = initialState, action: TeamsActionsUnion): TeamsReducerState {
  switch (action.type) {
    case TeamsActionTypes.LoadTeamsSuccess: {
      return teamsAdapter.addMany(action.payload.teams, state);
    }

    case TeamsActionTypes.SelectTeam: {
      return { ...state, selectedTeamId: action.payload.teamId };
    }

    default: {
      return state;
    }
  }
}
