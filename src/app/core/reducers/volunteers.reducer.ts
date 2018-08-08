import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Volunteer } from '../../shared/models';
import { VolunteersActionsUnion, VolunteersActionTypes } from '../actions/volunteers.actions';

export interface VolunteersReducerState extends EntityState<Volunteer> {
}

export const volunteersAdapter: EntityAdapter<Volunteer> = createEntityAdapter<Volunteer>();

export const initialState: VolunteersReducerState = volunteersAdapter.getInitialState();

export function volunteersReducer(state = initialState, action: VolunteersActionsUnion): VolunteersReducerState {
  switch (action.type) {
    case VolunteersActionTypes.LoadVolunteersSuccess: {
      return volunteersAdapter.addMany(action.payload.volunteers, state);
    }

    default: {
      return state;
    }
  }
}
