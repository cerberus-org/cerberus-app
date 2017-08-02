import 'hammerjs';

import { visitReducer } from './visit';
import { testVisits, Visit } from '../models/visit';

describe('visitReducer', () => {
  let visits: Visit[];

  beforeEach(() => {
    visits = testVisits.slice(0);
  });

  it('loads visits', () => {
    const result = visitReducer([], { type: 'LOAD_VISITS', payload: visits });
    expect(result).toBe(visits);
  });

  it('adds a visit', () => {
    const visit = Object.assign({}, visits[0]);
    visit.endedAt = new Date('2017-06-29T18:45:01.336Z');
    const result = visitReducer(visits, { type: 'ADD_VISIT', payload: visit });
    expect(result[0]).toBe(visit);
    expect(result.length).toBe(visits.length + 1);
  });

  it('modifies a visit', () => {
    const modified = Object.assign({}, visits[0]);
    modified.endedAt = new Date('2017-06-29T18:45:01.336Z');
    const result = visitReducer(visits, { type: 'MODIFY_VISIT', payload: modified });
    expect(result[0]).toBe(modified);
  });
});
