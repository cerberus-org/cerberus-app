import { createMockVisits } from '../../../mock/objects/visit.mock';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;
import { selectVisitWithVolunteers } from './visits.selectors';

describe('visits.selectors', () => {
  describe('selectVisitWithVolunteers', () => {
    xit('it should select visits with volunteers for the Visits page', () => {
      // const mockVisits = createMockVisits();
      // expect(selectVisitWithVolunteers.projector(mockVisits))
      //   .toEqual(arrayContaining([
      //     objectContaining({ columnDef: 'name', header: 'Name' }),
      //     objectContaining({ columnDef: 'date', header: 'Date' }),
      //     objectContaining({ columnDef: 'startedAt', header: 'Start' }),
      //     objectContaining({ columnDef: 'endedAt', header: 'End' }),
      //     objectContaining({ columnDef: 'duration', header: 'Duration' }),
      //   ]));
    });
  });
});
