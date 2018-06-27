import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockUsers } from '../../../mock/objects/user.mock';
import { Organization, User } from '../../../models';
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
    let user: User;

    beforeEach(() => {
      organization = createMockOrganizations()[0];
      user = createMockUsers()[0];
    });

    it('should initially return 0', () => {
      expect(selectMaxEnabledStep.projector(initialGettingStartedReducerState))
        .toEqual(0);
    });

    it('should return 1 if all steps are visited but the organization is invalid', () => {
      expect(selectMaxEnabledStep.projector({
        maxVisitedStep: 4,
        validOrganization: null,
        validUser: user,
        tosIsChecked: true,
      }))
        .toEqual(1);
    });

    it('should return 2 if all steps are visited but the user is invalid', () => {
      expect(selectMaxEnabledStep.projector({
        maxVisitedStep: 4,
        validOrganization: organization,
        validUser: null,
        tosIsChecked: true,
      }))
        .toEqual(2);
    });

    it('should return 3 if all steps are visited but the TOS is unchecked', () => {
      expect(selectMaxEnabledStep.projector({
        maxVisitedStep: 4,
        validOrganization: organization,
        validUser: user,
        tosIsChecked: false,
      }))
        .toEqual(3);
    });

    it('should return 4 if all steps are visited and all data is valid', () => {
      expect(selectMaxEnabledStep.projector({
        maxVisitedStep: 4,
        validOrganization: organization,
        validUser: user,
        tosIsChecked: true,
      }))
        .toEqual(4);
    });
  });

  describe('selectGettingStartedPageState', () => {
    it('should select the GettingStarted page state', () => {
      expect(selectGettingStartedPageState.projector(initialGettingStartedReducerState, 4))
        .toEqual({
          maxEnabledStep: 4,
          validOrganization: initialGettingStartedReducerState.validOrganization,
          validUser: initialGettingStartedReducerState.validUser,
          tosIsChecked: initialGettingStartedReducerState.tosIsChecked,
        });
    });
  });
});
