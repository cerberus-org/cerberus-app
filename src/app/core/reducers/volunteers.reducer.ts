import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Volunteer } from '../../shared/models';
import { VolunteersActionsUnion, VolunteersActionTypes } from '../actions/volunteers.actions';
import { sortByName } from '../helpers/entity.helpers';

export interface VolunteersReducerState extends EntityState<Volunteer> {}

export const volunteersAdapter: EntityAdapter<Volunteer> = createEntityAdapter<Volunteer>({
  sortComparer: sortByName,
});

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
