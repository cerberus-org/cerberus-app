import 'hammerjs';

import { locationReducer } from './location.reducer'
import { testLocations, Location } from '../models/location';
import * as fromLocations from './books';

describe('locationReducer', () => {
  let locations: Location[];

  beforeEach(() => {
    locations = testLocations.slice(0);
  });

  it('loads locations', () => {
    const result = locationReducer(fromLocations.initialState, { type: 'LOAD', payload: locations }).locations;
    expect(result).toBe(locations);
  });

  it('adds a location', () => {
    const location = Object.assign({}, locations[0]);
    const result = locationReducer(fromLocations.initialState, { type: 'ADD', payload: location }).locations;
    expect(result[0]).toBe(location);
    expect(result.length).toBe(locations.length + 1);
  });

  it('modifies a location', () => {
    const modified = Object.assign({}, locations[0]);
    const result = locationReducer(fromLocations.initialState,{ type: 'MODIFY_LOCATION', payload: modified }).locations;
    expect(result[0]).toBe(modified);
  });
});
