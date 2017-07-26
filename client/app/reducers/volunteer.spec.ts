import 'hammerjs';

import { volunteerReducer } from './volunteer';
import { testVolunteers, Volunteer } from '../models/volunteer';

describe('volunteerReducer', () => {
  let volunteers: Volunteer[];

  beforeEach(() => {
    volunteers = testVolunteers.slice(0);
  });

  it('loads volunteers', () => {
    const result = volunteerReducer([], { type: 'LOAD_VOLUNTEERS', payload: volunteers });
    expect(result).toBe(volunteers);
  });

  it('adds a volunteer', () => {
    const volunteer = Object.assign({}, volunteers[0]);
    const result = volunteerReducer(volunteers, { type: 'ADD_VOLUNTEER', payload: volunteer });
    expect(result[0]).toBe(volunteer);
    expect(result.length).toBe(volunteers.length + 1);
  });

  it('modifies a volunteer', () => {
    const modified = Object.assign({}, volunteers[0]);
    const result = volunteerReducer(volunteers, { type: 'MODIFY_VOLUNTEER', payload: modified });
    expect(result[0]).toBe(modified);
  });
});
