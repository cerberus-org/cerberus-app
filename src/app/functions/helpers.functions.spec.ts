import { mockVisits } from '../mock/objects/visit.mock';
import { createMockVolunteers } from '../mock/objects/volunteer.mock';
import { formatDuration } from './date-format.functions';
import {
  createMap,
  findActiveVisit,
  getFormattedVisits,
  getIndex,
  getItemWithoutArrayProperties,
  getUniqueFullNames,
  searchVolunteersByName,
} from './helpers.functions';

describe('helpers.functions', () => {
  it('should get visits with volunteer names', () => {
    const visits = [mockVisits[1]];
    const volunteers = [createMockVolunteers()[1]];
    const expected = [{
      ...mockVisits[1],
      name: volunteers[0].firstName + ' ' + volunteers[0].lastName,
      duration: formatDuration(visits[0].startedAt, visits[0].endedAt, visits[0].timezone),
    }];
    const formatted = getFormattedVisits(visits, volunteers);
    expect(formatted).toEqual(expected);
  });

  it('should filter volunteers by name', () => {
    const name = createMockVolunteers()[1].firstName;
    const filtered = searchVolunteersByName(createMockVolunteers(), name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(createMockVolunteers()[1]);
  });

  it('should get the unique full names from an array of volunteers', () => {
    const names = getUniqueFullNames(createMockVolunteers());
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${createMockVolunteers()[0].firstName} ${createMockVolunteers()[0].lastName}`);
    expect(names[1]).toEqual(`${createMockVolunteers()[1].firstName} ${createMockVolunteers()[1].lastName}`);
  });

  it('should find active visits for volunteers', () => {
    const volunteer = createMockVolunteers()[0];
    const selected = findActiveVisit(mockVisits, volunteer);
    expect(selected).toEqual(mockVisits[3]);
  });

  it('should get index of item', () => {
    const arr = [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }];
    expect(getIndex(arr, '2')).toEqual(1);
  });

  it('should not get index of item if id does not exist', () => {
    const arr = [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }];
    expect(getIndex(arr, '22')).toEqual(undefined);
  });

  it('should create map', () => {
    const arr = [{ id: '1', value: 'a' }, { id: '2', value: 'b' }, { id: '3', value: 'c' }];
    expect(createMap(arr).get('1')).toEqual(arr[0]);
  });

  it('should create empty map if array is undefined', () => {
    expect(createMap(null).get('1')).toEqual(undefined);
  });

  it('should remove values of type array from an obejct', () => {
    expect(getItemWithoutArrayProperties({ a: 'test', b: ['a', 'b'] })).toEqual({ a: 'test' });
  });
});
