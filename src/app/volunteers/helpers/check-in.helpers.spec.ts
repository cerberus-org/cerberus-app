import { mockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { findActiveVisit, getUniqueFullNames, searchVolunteersByName } from './check-in.helpers';

describe('check-in helpers', () => {
  it('should filter volunteers by name', () => {
    const name = createMockVolunteers()[1].name;
    const filtered = searchVolunteersByName(createMockVolunteers(), name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(createMockVolunteers()[1]);
  });

  it('should get the unique full names from an array of volunteers', () => {
    const names = getUniqueFullNames(createMockVolunteers());
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${createMockVolunteers()[0].name}`);
    expect(names[1]).toEqual(`${createMockVolunteers()[1].name}`);
  });

  it('should find active visits for volunteers', () => {
    const volunteer = createMockVolunteers()[0];
    const selected = findActiveVisit(mockVisits, volunteer);
    expect(selected).toEqual(mockVisits[3]);
  });
});
