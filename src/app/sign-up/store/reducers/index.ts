import { ActionReducerMap } from '@ngrx/store';
import { gettingStartedReducer, GettingStartedReducerState } from './getting-started.reducer';
import { JoinOrganizationReducerState } from './join-organization.reducer';

export interface SignUpState {
  gettingStarted: GettingStartedReducerState;
  joinOrganization: JoinOrganizationReducerState
}

export const signUpReducers: ActionReducerMap<SignUpState> = {
  gettingStarted: gettingStartedReducer,
};
