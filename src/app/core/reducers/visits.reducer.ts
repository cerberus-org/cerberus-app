import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Visit } from '../../shared/models';
import { VisitsActionsUnion, VisitsActionTypes } from '../actions/visits.actions';

export interface VisitsReducerState extends EntityState<Visit> {}

/**
 * Sorts visits to display recent visits first.
 *
 * @param {Visit} a
 * @param {Visit} b
 * @returns {number}
 */
export function sortByStartedAt(a: Visit, b: Visit): number {
  return b.startedAt.getTime() - a.startedAt.getTime();
}

export const visitsAdapter: EntityAdapter<Visit> = createEntityAdapter<Visit>({
  sortComparer: sortByStartedAt,
});

export const initialState: VisitsReducerState = visitsAdapter.getInitialState();

export function visitsReducer(state = initialState, action: VisitsActionsUnion): VisitsReducerState {
  switch (action.type) {
    case VisitsActionTypes.LoadVisitsSuccess: {

      return visitsAdapter.addMany(action.payload.visits, state);
    }

    default: {
      return state;
    }
  }
}
