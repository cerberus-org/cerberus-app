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
      const result = fromVisits.reducer(initialState, new VisitActions.Load(visits)).visits;
      expect(result).toEqual(testVisits.slice(0, 3).reverse());
    });
  });

  describe('ADD', () => {

    it('adds a visit', () => {
      const visit = Object.assign({}, visits[0]);
      const result = fromVisits.reducer(initialState, new VisitActions.Add(visit)).visits;
      expect(result[0]).toBe(visit);
      expect(result.length).toBe(visits.length + 1);
    });
  });

  describe('MODIFY', () => {

    it('modifies a visit', () => {
      const modified = Object.assign({}, visits[0]);
      const result = fromVisits.reducer(initialState, new VisitActions.Modify(modified)).visits;
      expect(result[0]).toBe(modified);
    });
  });

  describe('SELECT_ACTIVE_FOR_VOLUNTEER', () => {

    it('selects an active visit for a volutneer', () => {
      const volunteer = Object.assign({}, testVolunteers[0]);
      const result = fromVisits.reducer(initialState, new VisitActions.SelectActiveForVolunteer(volunteer));
      expect(result.selected).toBe(testVisits[3]);
    });
  });
});
