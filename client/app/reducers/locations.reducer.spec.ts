import { testLocations, Location } from '../models/location';
import * as fromLocations from './locations.reducer'
import * as LocationActions from '../actions/locations.actions';

describe('locationReducer', () => {
  let locations: Location[];

  beforeEach(() => {
    locations = testLocations.slice(0);

  });

  it('loads locations', () => {
    const result = fromLocations.reducer(fromLocations.initialState, new LocationActions.Load(locations)).locations;
    expect(result).toBe(locations);
  });

  it('adds a location', () => {
    const location = Object.assign({}, locations[0]);
    const result = fromLocations.reducer(fromLocations.initialState, new LocationActions.Add(location)).locations;
    expect(result[0]).toBe(location);
    expect(result.length).toBe(locations.length + 1);
  });

  it('modifies a location', () => {
    const modified = Object.assign({}, locations[0]);
    const result = fromLocations.reducer(fromLocations.initialState, new LocationActions.Modfiy(modified)).locations;
    expect(result[0]).toBe(modified);
  });
});
