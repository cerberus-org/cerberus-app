import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { createMockOrganizations } from '../../../../mocks/objects/organization.mock';
import * as SignUpActions from '../actions/sign-up.actions';
import { initialSignUpReducerState, signUpReducer } from './sign-up.reducer';

describe('signUpReducer', () => {

  describe('NEXT_STEP', () => {

    it('updates maxVisitedStep when the next maxVisitedStep is greater than the previous', () => {
      const state = signUpReducer(
        initialSignUpReducerState,
        new SignUpActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(1);
    });

    it('does not maxVisitedStep when the next maxVisitedStep is less than the previous', () => {
      const initialState = { ...initialSignUpReducerState, maxVisitedStep: 2 };
      const state = signUpReducer(
        initialState,
        new SignUpActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(2);
    });
  });

  describe('SET_VALID_ORGANIZATION', () => {

    it('updates the valid organization', () => {
      const organization = createMockOrganizations()[0];
      const state = signUpReducer(
        initialSignUpReducerState,
        new SignUpActions.SetValidOrganization(organization),
      );
      expect(state.validOrganization).toEqual(organization);
    });
  });

  describe('SET_VALID_MEMBER_AND_USER_INFO', () => {

    it('updates the valid organization', () => {
      const credentials = createMockCredentials()[0];
      const member = createMockMembers()[0];
      const state = signUpReducer(
        initialSignUpReducerState,
        new SignUpActions.SetValidMemberAndUserInfo({ credentials, member }),
      );
      expect(state.validCredentials).toEqual(credentials);
      expect(state.validMember).toEqual(member);
    });
  });
});
