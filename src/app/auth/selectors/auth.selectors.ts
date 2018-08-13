import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { AuthModuleState } from '../reducers';
import { AuthReducerState } from '../reducers/auth.reducer';

export const getAuthModuleState = createFeatureSelector<AuthModuleState>('authModule');

export const getAuthReducerState = createSelector(
  getAuthModuleState,
  (state: AuthModuleState): AuthReducerState => state.auth,
);

export const getUserInfo = createSelector(
  getAuthReducerState,
  (state: AuthReducerState): UserInfo => state.userInfo,
);
