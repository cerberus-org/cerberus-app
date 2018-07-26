import * as CheckInActions from '../actions/check-in.actions';
import { checkInReducer } from './check-in.reducer';

describe('checkInReducer', () => {
  describe('SUBMIT_NEW_VOLUNTEER_SUCCESS', () => {

    it('sets the tab index', () => {
      const state = checkInReducer(
        undefined,
        new CheckInActions.SubmitNewVolunteerSuccess(),
      );
      expect(state.selectedTabIndex).toEqual(0);
    });
  });
});
