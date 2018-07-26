import { createSelector } from '@ngrx/store';
import { selectPublicState } from '.';
import { Member, Organization } from '../../../shared/models';
import { Credentials } from '../../../shared/models/credentials';
import { PublicState } from '../reducers';

export const selectSignUpReducerState = createSelector(
  selectPublicState,
  (state: PublicState) => state.signUp,
);

/**
 * Selects the value used to determined the highest step to enable.
 * @type {MemoizedSelector<object, number>}
 */
export const selectMaxEnabledStep = createSelector(
  selectSignUpReducerState,
  ({ validOrganization, validCredentials, validMember, tosIsChecked, maxVisitedStep }) =>
    [true, !!validOrganization, !!validCredentials || !!validMember, tosIsChecked]
      .reduce(
        (maxEnabledStep, condition, index): number =>
          condition && maxEnabledStep === index && maxEnabledStep < maxVisitedStep ? maxEnabledStep + 1 : maxEnabledStep,
        0,
      ),
);

export interface SignUpPageState {
  maxEnabledStep: number;
  joinExistingOrganization: boolean;
  validOrganization: Organization;
  validCredentials: Credentials;
  validMember: Member;
  tosIsChecked: boolean;
}

export const selectSignUpPageState = createSelector(
  selectSignUpReducerState,
  selectMaxEnabledStep,
  (
    { joinExistingOrganization, validOrganization, validCredentials, validMember, tosIsChecked },
    maxEnabledStep: number,
  ): SignUpPageState => ({
    maxEnabledStep,
    joinExistingOrganization,
    validOrganization,
    validCredentials,
    validMember,
    tosIsChecked,
  }),
);
