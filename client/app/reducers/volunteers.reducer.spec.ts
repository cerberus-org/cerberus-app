import { testVolunteers, Volunteer } from '../models/volunteer';
import * as fromVolunteers from './volunteers.reducer'
import * as VolunteerActions from '../actions/volunteers.actions';

describe('volunteerReducer', () => {
  let volunteers: Volunteer[];

  beforeEach(() => {
    volunteers = testVolunteers.slice(0);

  });

  it('loads volunteers', () => {
    const result = fromVolunteers.reducer(fromVolunteers.initialState, new VolunteerActions.Load(volunteers)).volunteers;
    expect(result).toBe(volunteers);
  });

  it('adds a volunteer', () => {
    const volunteer = Object.assign({}, volunteers[0]);
    const result = fromVolunteers.reducer(fromVolunteers.initialState, new VolunteerActions.Add(volunteer)).volunteers;
    expect(result[0]).toBe(volunteer);
    expect(result.length).toBe(volunteers.length + 1);
  });

  it('modifies a volunteer', () => {
    const modified = Object.assign({}, volunteers[0]);
    const result = fromVolunteers.reducer(fromVolunteers.initialState, new VolunteerActions.Modify(modified)).volunteers;
    expect(result[0]).toBe(modified);
  });
});
