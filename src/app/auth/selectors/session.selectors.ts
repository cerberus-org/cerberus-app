import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { Member, Organization } from '../../shared/models';
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

export const selectSessionMember = createSelector(
  selectSessionReducerState,
  (state: SessionReducerState): Member => state.member,
);

export const selectSessionUserInfo = createSelector(
  selectSessionReducerState,
  (state: SessionReducerState): UserInfo => state.userInfo,
);
