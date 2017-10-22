import { testVisits } from '../models/visit';
import { testVolunteers } from '../models/volunteer';
import * as fromCheckIn from './check-in.reducer'
import * as CheckInActions from '../actions/check-in.actions';

describe('checkInReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromCheckIn.initialState, {
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

  describe('SELECT_ACTIVE_VISIT_FOR_VOLUNTEER', () => {

    it('selects an active visit for a volutneer', () => {
      const volunteer = Object.assign({}, testVolunteers[0]);
      const state = fromCheckIn.reducer(
        testState,
        new CheckInActions.SelectActiveVisitForVolunteer(volunteer)
      );
      expect(state.selectedVisit).toBe(testVisits[3]);
    });
  });

  describe('FILTER_AND_SELECT_VOLUNTEERS_BY_NAME', () => {

    it('filters by name', () => {
      const name = testVolunteers[1].firstName;
      const state = fromCheckIn.reducer(
        testState,
        new CheckInActions.FilterAndSelectVolunteersByName(name)
      );
      expect(state.filteredVolunteers[0]).toBe(testVolunteers[1]);
    });

    it('creates the list of unique names for the filtered testVolunteers', () => {
      const name = testVolunteers[0].firstName;
      const state = fromCheckIn.reducer(testState, new CheckInActions.FilterAndSelectVolunteersByName(name));
      expect(state.filteredUniqueNames.length).toEqual(1);
      expect(state.filteredUniqueNames[0]).toBe(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    });

    it('checks if the filtered testVolunteers all match the same name', () => {
      const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
      const state = fromCheckIn.reducer(testState, new CheckInActions.FilterAndSelectVolunteersByName(name));
      expect(state.filteredAllMatchSameName).toBeTruthy();
    });

    it('does not select if the name does not exactly match', () => {
      const name = testVolunteers[1].firstName;
      const state = fromCheckIn.reducer(testState, new CheckInActions.FilterAndSelectVolunteersByName(name));
      expect(state.selectedVolunteer).toBeFalsy();
    });

    it('selects if the name exactly matches', () => {
      const name = `${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`;
      const state = fromCheckIn.reducer(testState, new CheckInActions.FilterAndSelectVolunteersByName(name));
      expect(state.selectedVolunteer).toBe(testVolunteers[1]);
    });
  });

  describe('SELECT_VOLUNTEER_BY_PET_NAME', () => {

    it('selects if the name exactly matches', () => {
      const petName = testVolunteers[2].petName;
      const state = fromCheckIn.reducer(testState, new CheckInActions.SelectVolunteerByPetName(petName));
      expect(state.selectedVolunteer).toBe(testVolunteers[2]);
    });
  });
});
