import * as CheckInActions from '../actions/check-in.actions';
import * as fromCheckIn from './check-in.reducer';

describe('checkInReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromCheckIn.initialState, {
      selectedTabIndex: 1,
    });
  });

  describe('SUBMIT_NEW_VOLUNTEER_SUCCESS', () => {

    it('sets the tab index', () => {
      const state = fromCheckIn.reducer(
        fromCheckIn.initialState,
        new CheckInActions.SubmitNewVolunteerSuccess()
      );
      expect(state.selectedTabIndex).toEqual(0);
    });
  });
});
