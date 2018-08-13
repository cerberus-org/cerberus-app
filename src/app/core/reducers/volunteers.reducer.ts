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
    case VolunteersActionTypes.VolunteerAdded: {
      return volunteersAdapter.addOne(action.payload, state);
    }

    case VolunteersActionTypes.VolunteerModified: {
      return volunteersAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case VolunteersActionTypes.VolunteerRemoved: {
      return volunteersAdapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}
