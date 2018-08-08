import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Visit } from '../../shared/models';
import { VisitsActionsUnion, VisitsActionTypes } from '../actions/visits.actions';

export interface VisitsReducerState extends EntityState<Visit> {}

export function sortComparer(a: Visit, b: Visit): number {
  return a.startedAt.getTime() - b.startedAt.getTime();
}

export const visitsAdapter: EntityAdapter<Visit> = createEntityAdapter<Visit>({ sortComparer });

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
