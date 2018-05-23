import * as GettingStartedActions from '../actions/getting-started.actions';
import { getTestUsers, testOrganizations, testUsers } from '../models';
import * as fromGettingStarted from './getting-started.reducer';

describe('dataDisplayReducer', () => {

  describe('NEXT_STEP', () => {

    it('updates step when the next step is greater than the previous', () => {
      const state = fromGettingStarted.reducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.step).toEqual(1);
    });

    it('does not step when the next step is less than the previous', () => {
      const initialState = Object.assign({}, fromGettingStarted.initialState, { step: 2 });
      const state = fromGettingStarted.reducer(
        initialState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.step).toEqual(2);
    });
  });

  describe('UPDATE_VALID_ORGANIZATION', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.reducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidOrganization(testOrganizations[0]),
      );
      expect(state.validOrganization).toEqual(testOrganizations[0]);
    });
  });

  describe('UPDATE_VALID_USER', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.reducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidUser(getTestUsers()[0]),
      );
      expect(state.validUser).toEqual(getTestUsers()[0]);
    });
  });
});
