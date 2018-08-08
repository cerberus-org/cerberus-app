import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Visit } from '../../shared/models';
import { VisitsActionsUnion, VisitsActionTypes } from '../actions/visits.actions';

export interface State extends EntityState<Visit> {
}

export const adapter: EntityAdapter<Visit> = createEntityAdapter<Visit>();

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: VisitsActionsUnion): State {
  switch (action.type) {
    case VisitsActionTypes.LoadVisitsSuccess: {
      return adapter.addMany(action.payload.visits, state);
    }

    default: {
      return state;
    }
  }
}
