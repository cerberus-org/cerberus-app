import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersAdapter, UsersReducerState } from '../reducers/users.reducer';
import { getMembersForSelectedTeam, getUserIdsForSelectedTeam } from './members.selectors';

export const getUsersReducerState = createFeatureSelector<UsersReducerState>('users');

export const {
  selectAll: getAllUsers,
  selectEntities: getUserEntities,
} = usersAdapter.getSelectors(getUsersReducerState);
