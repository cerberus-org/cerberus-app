import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectSessionReducerState = createSelector(selectAuthState, state => state.session);
