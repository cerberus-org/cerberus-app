import { testVisits, Visit } from '../models/visit';
import * as fromVisits from './visits.reducer'
import * as VisitActions from '../actions/visits.actions';

describe('visitReducer', () => {
  let visits: Visit[], initialState;

  beforeEach(() => {
    visits = testVisits.slice(0);
    initialState = Object.assign({}, fromVisits.initialState, { visits: visits });
  });

  it('loads visits', () => {
    const result = fromVisits.reducer(initialState, new VisitActions.LoadVisits(visits)).visits;
    expect(result).toEqual(testVisits.slice(0, 3).reverse());
  });

  it('adds a visit', () => {
    const visit = Object.assign({}, visits[0]);
    const result = fromVisits.reducer(initialState, new VisitActions.AddVisit(visit)).visits;
    expect(result[0]).toBe(visit);
    expect(result.length).toBe(visits.length + 1);
  });

  it('modifies a visit', () => {
    const modified = Object.assign({}, visits[0]);
    const result = fromVisits.reducer(initialState, new VisitActions.ModifyVisit(modified)).visits;
    expect(result[0]).toBe(modified);
  });
});
