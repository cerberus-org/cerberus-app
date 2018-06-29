import { createMockCredentials } from '../../../mock/objects/credentials.mock';
import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { Organization, Member } from '../../../models';
import { Credentials } from '../../../models/credentials';
import { initialGettingStartedReducerState } from '../reducers/getting-started.reducer';
import {
  selectGettingStartedPageState,
  selectGettingStartedReducerState,
  selectMaxEnabledStep,
} from './getting-started.selectors';

describe('GettingStartedSelectors', () => {
  describe('selectGettingStartedReducerState', () => {
    it('should select the GettingStarted reducer state', () => {
      const state = initialGettingStartedReducerState;
      expect(selectGettingStartedReducerState.projector({
        gettingStarted: state,
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
      expect(selectMaxEnabledStep.projector(initialGettingStartedReducerState))
        .toEqual(0);
    });

    it('should return 1 if all steps are visited but the validOrganization is invalid', () => {
      expect(selectMaxEnabledStep.projector({
        maxVisitedStep: 4,
        validOrganization: null,
        validCredentials: credentials,
        validMember: member,
        tosIsChecked: true,
      }))
        .toEqual(1);
    });

    it('should return 2 if all steps are visited but the user data is invalid', () => {
      expect(selectMaxEnabledStep.projector({
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
        maxVisitedStep: 4,
        validOrganization: organization,
        validCredentials: credentials,
        validMember: member,
        tosIsChecked: true,
      }))
        .toEqual(4);
    });
  });

  describe('selectGettingStartedPageState', () => {
    it('should select the GettingStarted page state', () => {
      const { validOrganization, validCredentials, validMember, tosIsChecked } = initialGettingStartedReducerState;
      expect(selectGettingStartedPageState.projector(initialGettingStartedReducerState, 4))
        .toEqual({
          validOrganization,
          validCredentials,
          validMember,
          tosIsChecked,
          maxEnabledStep: 4,
        });
    });
  });
});
