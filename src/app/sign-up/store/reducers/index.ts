import { ActionReducerMap } from '@ngrx/store';
import { gettingStartedReducer, GettingStartedReducerState } from './getting-started.reducer';

export interface SignUpState {
  gettingStarted: GettingStartedReducerState;
}

export const signUpReducers: ActionReducerMap<SignUpState> = {
  gettingStarted: gettingStartedReducer,
};
