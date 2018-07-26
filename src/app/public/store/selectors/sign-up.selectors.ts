import { createSelector } from '@ngrx/store';
import { Member, Organization } from '../../../shared/models';
import { Credentials } from '../../../shared/models/credentials';
import { PublicState } from '../reducers';
import { selectPublicState } from './index';

export const selectGettingStartedReducerState = createSelector(
  selectPublicState,
  (state: PublicState) => state.signUp,
);

/**
 * Selects the value used to determined the highest step to enable.
 * @type {MemoizedSelector<object, number>}
 */
export const selectMaxEnabledStep = createSelector(
  selectGettingStartedReducerState,
  ({ validOrganization, validCredentials, validMember, tosIsChecked, maxVisitedStep }) =>
    [true, !!validOrganization, !!validCredentials || !!validMember, tosIsChecked]
      .reduce(
        (maxEnabledStep, condition, index): number =>
          condition && maxEnabledStep === index && maxEnabledStep < maxVisitedStep ? maxEnabledStep + 1 : maxEnabledStep,
        0,
      ),
);

export interface GettingStartedPageState {
  maxEnabledStep: number;
  joinExistingOrganization: boolean;
  validOrganization: Organization;
  validCredentials: Credentials;
  validMember: Member;
  tosIsChecked: boolean;
}

export const selectGettingStartedPageState = createSelector(
  selectGettingStartedReducerState,
  selectMaxEnabledStep,
  (
    { joinExistingOrganization, validOrganization, validCredentials, validMember, tosIsChecked },
    maxEnabledStep: number,
  ): GettingStartedPageState => ({
    maxEnabledStep,
    joinExistingOrganization,
    validOrganization,
    validCredentials,
    validMember,
    tosIsChecked,
  }),
);
