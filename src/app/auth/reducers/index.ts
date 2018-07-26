import { ActionReducerMap } from '@ngrx/store';
import { sessionReducer, SessionReducerState } from './session.reducer';

export interface AuthState {
  session: SessionReducerState;
}

export const authReducers: ActionReducerMap<AuthState> = {
  session: sessionReducer,
};
