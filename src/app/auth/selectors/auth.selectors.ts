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

export const getUserInfoUid = createSelector(
  getUserInfo,
  (userInfo: UserInfo): string => userInfo && userInfo.uid,
);

export const getUserInfoEmail = createSelector(
  getUserInfo,
  (userInfo: UserInfo): string => userInfo && userInfo.email,
);
