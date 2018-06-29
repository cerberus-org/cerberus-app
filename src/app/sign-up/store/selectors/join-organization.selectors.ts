import { createSelector } from '@ngrx/store';
import { SignUpState } from '../reducers';
import { selectSignUpState } from './sign-up.selectors';

export const selectJoinOrganizationReducerState = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.joinOrganization,
);
