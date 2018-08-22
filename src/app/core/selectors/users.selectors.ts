import { createFeatureSelector } from '@ngrx/store';
import { usersAdapter, UsersReducerState } from '../reducers/users.reducer';

export const getUsersReducerState = createFeatureSelector<UsersReducerState>('users');

export const {
  selectAll: getAllUsers,
  selectEntities: getUserEntities,
} = usersAdapter.getSelectors(getUsersReducerState);
