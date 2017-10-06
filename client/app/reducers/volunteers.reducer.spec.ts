import { testVolunteers, Volunteer } from '../models/volunteer';
import * as fromVolunteers from './volunteers.reducer'
import * as VolunteerActions from '../actions/volunteers.actions';
import { State } from './index';

describe('volunteerReducer', () => {
  let volunteers: Volunteer[], initialState: State['volunteers'];

  beforeEach(() => {
    volunteers = testVolunteers.slice(0);
    initialState = Object.assign({}, fromVolunteers.initialState, { volunteers: volunteers });
  });

  describe('LOAD', () => {

    it('loads volunteers', () => {
      const result = fromVolunteers.reducer(initialState, new VolunteerActions.Load(volunteers)).volunteers;
      expect(result).toBe(volunteers);
    });
  });

  describe('ADD', () => {

    it('adds a volunteer', () => {
      const volunteer = Object.assign({}, volunteers[0]);
      const result = fromVolunteers.reducer(initialState, new VolunteerActions.Add(volunteer)).volunteers;
      expect(result[0]).toBe(volunteer);
      expect(result.length).toBe(volunteers.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a volunteer', () => {
      const modified = Object.assign({}, volunteers[0]);
      const result = fromVolunteers.reducer(initialState, new VolunteerActions.Modify(modified)).volunteers;
      expect(result[0]).toBe(modified);
      expect(result.length).toBe(volunteers.length);
    });
  });

  describe('FILTER_AND_SELECT_BY_NAME', () => {

    it('filters by name', () => {
      const name = volunteers[1].firstName;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.FilterAndSelectByName(name));
      expect(state.filtered[0]).toBe(volunteers[1]);
    });

    it('creates the list of unique names for the filtered volunteers', () => {
      const name = volunteers[0].firstName;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.FilterAndSelectByName(name));
      expect(state.filteredUniqueNames.length).toEqual(1);
      expect(state.filteredUniqueNames[0]).toBe(`${volunteers[0].firstName} ${volunteers[0].lastName}`);
    });

    it('checks if the filtered volunteers all match the same name', () => {
      const name = `${volunteers[0].firstName} ${volunteers[0].lastName}`;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.FilterAndSelectByName(name));
      expect(state.filteredAllMatchSameName).toBeTruthy();
    });

    it('does not select if the name does not exactly match', () => {
      const name = volunteers[1].firstName;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.FilterAndSelectByName(name));
      expect(state.selected).toBeFalsy();
    });

    it('selects if the name exactly matches', () => {
      const name = `${volunteers[1].firstName} ${volunteers[1].lastName}`;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.FilterAndSelectByName(name));
      expect(state.selected).toBe(volunteers[1]);
    });
  });

  describe('SELECT_BY_PET_NAME', () => {

    it('selects if the name exactly matches', () => {
      const petName = volunteers[2].petName;
      const state = fromVolunteers.reducer(initialState, new VolunteerActions.SelectByPetName(petName));
      expect(state.selected).toBe(volunteers[2]);
    });
  });
});
