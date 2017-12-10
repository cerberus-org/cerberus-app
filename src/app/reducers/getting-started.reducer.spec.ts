import * as GettingStartedActions from '../actions/getting-started.actions';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';
import * as fromGettingStarted from './getting-started.reducer'

describe('dataDisplayReducer', () => {

  describe('NEXT_STEP', () => {

    it('sets the selectedTabIndex', () => {
      const state = fromGettingStarted.reducer(fromGettingStarted.initialState,
        new GettingStartedActions.NextStep(1));
      expect(state.selectedTabIndex).toBe(1);
    });

    it('updates step when the next step is greater than the previous', () => {
      const state = fromGettingStarted.reducer(fromGettingStarted.initialState,
        new GettingStartedActions.NextStep(1));
      expect(state.step).toBe(1);
    });

    it('does not step when the next step is less than the previous', () => {
      const initialState = Object.assign({}, fromGettingStarted.initialState, { step: 2 });
      const state = fromGettingStarted.reducer(initialState,
        new GettingStartedActions.NextStep(1));
      expect(state.step).toBe(2);
    });
  });

  describe('UPDATE_VALID_ORGANIZATION', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.reducer(fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidOrganization(testOrganizations[0]));
      expect(state.validOrganization).toBe(testOrganizations[0]);
    });
  });

  describe('UPDATE_VALID_USER', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.reducer(fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidUser(testUsers[0]));
      expect(state.validUser).toBe(testUsers[0]);
    });
  });
});
