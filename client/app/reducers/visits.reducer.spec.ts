import { testVisits, Visit } from '../models/visit';
import * as fromVisits from './visits.reducer'
import * as VisitActions from '../actions/visits.actions';

describe('visitReducer', () => {
  let visits: Visit[];

  beforeEach(() => {
    visits = testVisits.slice(0);

  });

  it('loads visits', () => {
    const result = fromVisits.reducer(fromVisits.initialState, new VisitActions.Load(visits)).visits;
    expect(result).toBe(testVisits.slice(0, 3).reverse());
  });

  it('adds a visit', () => {
    const visit = Object.assign({}, visits[0]);
    const result = fromVisits.reducer(fromVisits.initialState, new VisitActions.Add(visit)).visits;
    expect(result[0]).toBe(visit);
    expect(result.length).toBe(visits.length + 1);
  });

  it('modifies a visit', () => {
    const modified = Object.assign({}, visits[0]);
    const result = fromVisits.reducer(fromVisits.initialState, new VisitActions.Modify(modified)).visits;
    expect(result[0]).toBe(modified);
  });
});
