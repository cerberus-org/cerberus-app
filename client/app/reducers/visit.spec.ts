import 'hammerjs';

import VisitReducer from './visit';
import { testVisits, Visit } from '../models/visit';

describe('VisitReducer', () => {
  let visits: Visit[];

  beforeEach(() => {
    visits = testVisits.slice(0);
  });

  it('loads visits', () => {
    const result = VisitReducer([], { type: 'LOAD_VISITS', payload: visits });
    expect(result).toBe(visits);
  });

  it('adds a visit', () => {
    const visit = Object.assign({}, visits[0]);
    visit.endedAt = new Date('2017-06-29T18:45:01.336Z');
    const result = VisitReducer(visits, { type: 'ADD_VISIT', payload: visit });
    expect(result[0]).toBe(visit);
    expect(result.length).toBe(visits.length + 1);
  });

  it('modifies a visit', () => {
    const modified = Object.assign({}, visits[0]);
    modified.endedAt = new Date('2017-06-29T18:45:01.336Z');
    const result = VisitReducer(visits, { type: 'ADD_VISIT', payload: modified });
    expect(result[0]).toBe(modified);
  });
});
