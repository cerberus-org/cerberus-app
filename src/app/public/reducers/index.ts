import { ActionReducerMap } from '@ngrx/store';
import { signUpReducer, SignUpReducerState } from './sign-up.reducer';

export interface PublicState {
  signUp: SignUpReducerState;
}

export const publicReducers: ActionReducerMap<PublicState> = {
  signUp: signUpReducer,
};
