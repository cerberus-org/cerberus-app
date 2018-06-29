import { createMockColumnOptions } from '../../../mock/objects/column-options.mock';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { selectVisitsColumnOptions, selectVisitsPageState } from './visits.selectors';

describe('VisitsSelectors', () => {
  describe('selectVisitsColumnOptions', () => {
    it('it should select column options for the Visits page', () => {
      const mockVisits = createMockVisits();
      expect(selectVisitsColumnOptions.projector(mockVisits))
        .toEqual(arrayContaining([
          objectContaining({ columnDef: 'firstName', header: 'First Name' }),
          objectContaining({ columnDef: 'lastName', header: 'Last Name' }),
          objectContaining({ columnDef: 'startedAt', header: 'Start' }),
          objectContaining({ columnDef: 'endedAt', header: 'End' }),
        ]));
    });
  });

  describe('selectVisitsPageState', () => {
    it('it should select the Visits page state', () => {
      const mockVisits = createMockVisits();
      const mockColumnOptions = createMockColumnOptions();
      expect(selectVisitsPageState.projector(mockVisits, mockColumnOptions))
        .toEqual({
          visits: mockVisits,
          columnOptions: mockColumnOptions,
        });
    });
  });
});
