import { createSelector } from '@ngrx/store';
import { Organization, User } from '../../../models';
import { SignUpState } from '../reducers';
import { GettingStartedReducerState } from '../reducers/getting-started.reducer';
import { selectSignUpState } from './sign-up.selectors';

export const selectGettingStartedReducerState = createSelector(
  selectSignUpState,
  (state: SignUpState) => state.gettingStarted,
);

/**
 * Selects the value used to determined the highest step to enable.
 * @type {MemoizedSelector<object, number>}
 */
export const selectMaxEnabledStep = createSelector(
  selectGettingStartedReducerState,
  (state: GettingStartedReducerState) =>
    [true, !!state.validOrganization, !!state.validUser, state.tosIsChecked]
      .reduce(
        (maxEnabledStep, condition): number =>
          condition && maxEnabledStep < state.maxVisitedStep ? maxEnabledStep + 1 : maxEnabledStep,
        0,
      ),
);

export interface GettingStartedContainerState {
  maxEnabledStep: number;
  validOrganization: Organization;
  validUser: User;
}

export const selectGettingStartedContainerState = createSelector(
  selectGettingStartedReducerState,
  selectMaxEnabledStep,
  (state: GettingStartedReducerState, maxEnabledStep: number): GettingStartedContainerState => ({
    maxEnabledStep,
    validOrganization: state.validOrganization,
    validUser: state.validUser,
  }),
);
