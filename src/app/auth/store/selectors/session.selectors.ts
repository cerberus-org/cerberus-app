import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Organization, User } from '../../../models';
import { AuthState } from '../reducers';
import { SessionReducerState } from '../reducers/session.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectSessionReducerState = createSelector(
  selectAuthState,
  (state: AuthState): SessionReducerState => state.session,
);

export const selectSessionOrganization = createSelector(
  selectSessionReducerState,
  (state: SessionReducerState): Organization => state.organization,
);

export const selectSessionUser = createSelector(
  selectSessionReducerState,
  (state: SessionReducerState): User => state.user,
);
