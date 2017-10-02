import { testVolunteers, Volunteer } from '../models/volunteer';
import * as fromVolunteers from './volunteers.reducer'
import * as VolunteerActions from '../actions/volunteers.actions';
import { State } from './index';

describe('volunteerReducer', () => {
  let volunteers: Volunteer[],
  initialState: State['volunteers'];

  beforeEach(() => {
    volunteers = testVolunteers.slice(0);
    initialState = Object.assign({}, fromVolunteers.initialState, { volunteers: volunteers });
  });

  it('loads volunteers', () => {
    const result = fromVolunteers.reducer(initialState, new VolunteerActions.LoadVolunteers(volunteers)).volunteers;
    expect(result).toBe(volunteers);
  });

  it('adds a volunteer', () => {
    const volunteer = Object.assign({}, volunteers[0]);
    const result = fromVolunteers.reducer(initialState, new VolunteerActions.AddVolunteer(volunteer)).volunteers;
    expect(result[0]).toBe(volunteer);
    expect(result.length).toBe(volunteers.length + 1);
  });

  it('modifies a volunteer', () => {
    const modified = Object.assign({}, volunteers[0]);
    const result = fromVolunteers.reducer(initialState, new VolunteerActions.ModifyVolunteer(modified)).volunteers;
    expect(result[0]).toBe(modified);
  });
});
