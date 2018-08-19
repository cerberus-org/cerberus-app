import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../shared/models';
import { UsersActionsUnion, UsersActionTypes } from '../actions/users.actions';
import { sortByName } from '../helpers/entity.helpers';

export interface UsersReducerState extends EntityState<User> {}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: sortByName,
});

export const initialState: UsersReducerState = usersAdapter.getInitialState();

export function usersReducer(state = initialState, action: UsersActionsUnion): UsersReducerState {
  switch (action.type) {
    case UsersActionTypes.UserAdded: {
      return usersAdapter.addOne(action.payload, state);
    }

    case UsersActionTypes.UserModified: {
      return usersAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case UsersActionTypes.UserRemoved: {
      return usersAdapter.removeOne(action.payload.id, state);
    }

    case UsersActionTypes.UserChanged: {
      return usersAdapter.upsertOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
