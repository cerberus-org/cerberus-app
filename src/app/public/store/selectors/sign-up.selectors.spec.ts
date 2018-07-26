import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { createMockMembers } from '../../../../mocks/objects/member.mock';
import { createMockOrganizations } from '../../../../mocks/objects/organization.mock';
import { Member, Organization } from '../../../shared/models';
import { Credentials } from '../../../shared/models/credentials';
import { initialSignUpReducerState } from '../reducers/sign-up.reducer';
import { selectMaxEnabledStep, selectSignUpPageState, selectSignUpReducerState } from './sign-up.selectors';

describe('SignUpSelectors', () => {
  describe('selectSignUpReducerState', () => {
    it('should select the state', () => {
      const state = initialSignUpReducerState;
      expect(selectSignUpReducerState.projector({
        signUp: state,
      }))
        .toEqual(state);
    });
  });

  describe('selectMaxEnabledStep', () => {
    let organization: Organization;
    let credentials: Credentials;
    let member: Member;

    beforeEach(() => {
      organization = createMockOrganizations()[0];
      credentials = createMockCredentials()[0];
      member = createMockMembers()[0];
    });

    it('should initially return 0', () => {
      expect(selectMaxEnabledStep.projector(initialSignUpReducerState))
        .toEqual(0);
    });

    it('should return 1 if all steps are visited but the organization is invalid', () => {
      expect(selectMaxEnabledStep.projector({
        joinExistingOrganization: false,
        maxVisitedStep: 4,
        validOrganization: null,
        validCredentials: credentials,
        validMember: member,
        tosIsChecked: true,
      }))
        .toEqual(1);
    });

    it('should return 2 if all steps are visited but the userInfo data is invalid', () => {
      expect(selectMaxEnabledStep.projector({
        joinExistingOrganization: false,
        maxVisitedStep: 4,
        validOrganization: organization,
        validCredentials: null,
        validMember: null,
        tosIsChecked: true,
      }))
        .toEqual(2);
    });

    it('should return 3 if all steps are visited but the TOS is unchecked', () => {
      expect(selectMaxEnabledStep.projector({
        joinExistingOrganization: false,
        maxVisitedStep: 4,
        validOrganization: organization,
        validCredentials: credentials,
        validMember: member,
        tosIsChecked: false,
      }))
        .toEqual(3);
    });

    it('should return 4 if all steps are visited and all data is valid', () => {
      expect(selectMaxEnabledStep.projector({
        joinExistingOrganization: false,
        maxVisitedStep: 4,
        validOrganization: organization,
        validCredentials: credentials,
        validMember: member,
        tosIsChecked: true,
      }))
        .toEqual(4);
    });
  });

  describe('selectSignUpPageState', () => {
    it('should select the state', () => {
      const { joinExistingOrganization, validOrganization, validCredentials, validMember, tosIsChecked } = initialSignUpReducerState;
      expect(selectSignUpPageState.projector(initialSignUpReducerState, 4))
        .toEqual({
          joinExistingOrganization,
          validOrganization,
          validCredentials,
          validMember,
          tosIsChecked,
          maxEnabledStep: 4,
        });
    });
  });
});
