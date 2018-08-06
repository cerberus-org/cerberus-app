import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTeams from './teams.reducer';

export interface TeamsState {
  teams: fromTeams.State;
}

export const reducers: ActionReducerMap<TeamsState> = {
  teams: fromTeams.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `teams` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.teamsState$ = state$.pipe(select(getTeamsState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getTeamsState = createFeatureSelector<TeamsState>('teams');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getTeamsEntitiesState = createSelector(
  getTeamsState,
  state => state.teams,
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectAll: getAllTeams,
} = fromTeams.adapter.getSelectors(getTeamsEntitiesState);