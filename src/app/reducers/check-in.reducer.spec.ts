import * as fromCheckIn from './check-in.reducer'
import * as CheckInActions from '../actions/check-in.actions';
import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';

describe('checkInReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromCheckIn.initialState, {
      selectedTabIndex: 1,
      visits: testVisits,
      volunteers: testVolunteers
    });
  });

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads volunteers and visits', () => {
      const state = fromCheckIn.reducer(
        fromCheckIn.initialState,
        new CheckInActions.LoadDataSuccess({
          visits: testVisits,
          volunteers: testVolunteers
        }));
      expect(state.visits).toEqual(testVisits);
      expect(state.volunteers).toEqual(testVolunteers);
    });
  });

  describe('SUBMIT_NEW_VOLUNTEER_SUCCESS', () => {

    it('sets the tab index', () => {
      const state = fromCheckIn.reducer(
        fromCheckIn.initialState,
        new CheckInActions.SubmitNewVolunteerSuccess({
          visits: testVisits,
          volunteers: testVolunteers
        }));
      expect(state.selectedTabIndex).toEqual(0);
    });
  });
});
