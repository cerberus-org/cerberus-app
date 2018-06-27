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
        (maxEnabledStep, condition, index): number =>
          condition && maxEnabledStep === index && maxEnabledStep < state.maxVisitedStep ? maxEnabledStep + 1 : maxEnabledStep,
        0,
      ),
);

export interface GettingStartedPageState {
  maxEnabledStep: number;
  validOrganization: Organization;
  validUser: User;
  tosIsChecked: boolean;
}

export const selectGettingStartedPageState = createSelector(
  selectGettingStartedReducerState,
  selectMaxEnabledStep,
  (state: GettingStartedReducerState, maxEnabledStep: number): GettingStartedPageState => ({
    maxEnabledStep,
    validOrganization: state.validOrganization,
    validUser: state.validUser,
    tosIsChecked: state.tosIsChecked,
  }),
);
