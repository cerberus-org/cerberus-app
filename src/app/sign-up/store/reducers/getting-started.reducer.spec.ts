import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { createMockUsers } from '../../../mock/objects/user.mock';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { gettingStartedReducer, initialGettingStartedReducerState } from './getting-started.reducer';

describe('gettingStartedReducer', () => {

  describe('NEXT_STEP', () => {

    it('updates maxVisitedStep when the next maxVisitedStep is greater than the previous', () => {
      const state = gettingStartedReducer(
        initialGettingStartedReducerState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(1);
    });

    it('does not maxVisitedStep when the next maxVisitedStep is less than the previous', () => {
      const initialState = { ...initialGettingStartedReducerState, maxVisitedStep: 2 };
      const state = gettingStartedReducer(
        initialState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(2);
    });
  });

  describe('UPDATE_VALID_ORGANIZATION', () => {

    it('updates the valid organization', () => {
      const state = gettingStartedReducer(
        initialGettingStartedReducerState,
        new GettingStartedActions.UpdateValidOrganization(mockOrganizations[0]),
      );
      expect(state.validOrganization).toEqual(mockOrganizations[0]);
    });
  });

  describe('UPDATE_VALID_USER', () => {

    it('updates the valid organization', () => {
      const state = gettingStartedReducer(
        initialGettingStartedReducerState,
        new GettingStartedActions.UpdateValidUser(createMockUsers()[0]),
      );
      expect(state.validUser).toEqual(createMockUsers()[0]);
    });
  });
});
