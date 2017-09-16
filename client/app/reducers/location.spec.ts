import 'hammerjs';

import { locationReducer } from './location';
import { testLocations, Location } from '../models/location';

describe('locationReducer', () => {
  let locations: Location[];

  beforeEach(() => {
    locations = testLocations.slice(0);
  });

  it('loads locations', () => {
    const result = locationReducer([], { type: 'LOAD_LOCATIONS', payload: locations });
    expect(result).toBe(locations);
  });

  it('adds a location', () => {
    const location = Object.assign({}, locations[0]);
    const result = locationReducer(locations, { type: 'ADD_LOCATION', payload: location });
    expect(result[0]).toBe(location);
    expect(result.length).toBe(locations.length + 1);
  });

  it('modifies a location', () => {
    const modified = Object.assign({}, locations[0]);
    const result = locationReducer(locations, { type: 'MODIFY_LOCATION', payload: modified });
    expect(result[0]).toBe(modified);
  });
});
