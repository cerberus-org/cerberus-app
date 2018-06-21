import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getSessionState = createSelector(getAuthState, state => state.session);
