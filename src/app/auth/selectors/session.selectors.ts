import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { AuthState } from '../reducers';
import { SessionReducerState } from '../reducers/session.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('authModule');

export const selectSessionReducerState = createSelector(
  selectAuthState,
  (state: AuthState): SessionReducerState => state.session,
);

export const getUserInfo = createSelector(
  selectSessionReducerState,
  (state: SessionReducerState): UserInfo => state.userInfo,
);
