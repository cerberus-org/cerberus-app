///<reference path="../../../mock/objects/organization.mock.ts"/>
import { mockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import * as GettingStartedActions from '../actions/getting-started.actions';
import * as fromGettingStarted from './getting-started.reducer';

describe('dataDisplayReducer', () => {

  describe('NEXT_STEP', () => {

    it('updates maxVisitedStep when the next maxVisitedStep is greater than the previous', () => {
      const state = fromGettingStarted.gettingStartedReducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(1);
    });

    it('does not maxVisitedStep when the next maxVisitedStep is less than the previous', () => {
      const initialState = Object.assign({}, fromGettingStarted.initialState, { step: 2 });
      const state = fromGettingStarted.gettingStartedReducer(
        initialState,
        new GettingStartedActions.NextStep(1),
      );
      expect(state.maxVisitedStep).toEqual(2);
    });
  });

  describe('UPDATE_VALID_ORGANIZATION', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.gettingStartedReducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidOrganization(mockOrganizations[0]),
      );
      expect(state.validOrganization).toEqual(mockOrganizations[0]);
    });
  });

  describe('UPDATE_VALID_USER', () => {

    it('updates the valid organization', () => {
      const state = fromGettingStarted.gettingStartedReducer(
        fromGettingStarted.initialState,
        new GettingStartedActions.UpdateValidUser(getMockUsers()[0]),
      );
      expect(state.validUser).toEqual(getMockUsers()[0]);
    });
  });
});
