import { createMockColumnOptions } from '../../../mock/objects/column-options.mock';
import { createMockVisits } from '../../../mock/objects/visit.mock';
import { selectVisitsColumnOptions, selectVisitsPageState } from './visits.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('VisitsSelectors', () => {
  describe('selectVisitsColumnOptions', () => {
    it('it should select column options for the Visits page', () => {
      const mockVisits = createMockVisits();
      expect(selectVisitsColumnOptions.projector(mockVisits))
        .toEqual(arrayContaining([
          objectContaining({ columnDef: 'name', header: 'Name' }),
          objectContaining({ columnDef: 'date', header: 'Date' }),
          objectContaining({ columnDef: 'startedAt', header: 'Start' }),
          objectContaining({ columnDef: 'endedAt', header: 'End' }),
          objectContaining({ columnDef: 'duration', header: 'Duration' }),
        ]));
    });
  });

  describe('selectVisitsPageState', () => {
    xit('it should select the Visits page state', () => {
      const mockVisits = createMockVisits();
      const mockColumnOptions = createMockColumnOptions();
      expect(selectVisitsPageState.projector(mockColumnOptions))
        .toEqual({
          columnOptions: mockColumnOptions,
        });
    });
  });
});
