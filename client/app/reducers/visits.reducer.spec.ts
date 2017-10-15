import { testVisits, Visit } from '../models/visit';
import * as fromVisits from './visits.reducer'
import * as VisitActions from '../actions/visits.actions';
import { testVolunteers } from '../models/volunteer';

describe('visitReducer', () => {
  let visits: Visit[], initialState;

  beforeEach(() => {
    visits = testVisits.slice(0);
    initialState = Object.assign({}, fromVisits.initialState, { visits: visits });
  });

  describe('LOAD', () => {

    it('loads visits', () => {
      const state = fromVisits.reducer(initialState, new VisitActions.Load(visits));
      expect(state.visits).toEqual(testVisits.slice(0, 3).reverse());
    });
  });

  describe('ADD', () => {

    it('adds a visit', () => {
      const visit = Object.assign({}, visits[0]);
      const state = fromVisits.reducer(initialState, new VisitActions.Add(visit));
      expect(state.visits[0]).toBe(visit);
      expect(state.visits.length).toBe(visits.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a visit', () => {
      const modified = Object.assign({}, visits[0]);
      const state = fromVisits.reducer(initialState, new VisitActions.Modify(modified));
      expect(state.visits[0]).toBe(modified);
    });
  });

  describe('SELECT_ACTIVE_VISIT_FOR_VOLUNTEER', () => {

    it('selects an active visit for a volutneer', () => {
      const volunteer = Object.assign({}, testVolunteers[0]);
      const state = fromVisits.reducer(initialState, new VisitActions.SelectActiveForVolunteer(volunteer));
      expect(state.selected).toBe(testVisits[3]);
    });
  });
});
