import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthReducerState } from './auth.reducer';

export interface AuthModuleState {
  auth: AuthReducerState;
}

export const authReducers: ActionReducerMap<AuthModuleState> = {
  auth: authReducer,
};
