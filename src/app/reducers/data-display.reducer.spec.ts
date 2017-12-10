import * as DataDisplayActions from '../actions/data-display.actions';
import { testVisits } from '../models/visit';
import * as fromDataDisplay from './data-display.reducer'

describe('dataDisplayReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads visits in reverse', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
        new DataDisplayActions.LoadDataSuccess(testVisits));
      expect(state.visits).toEqual(testVisits.slice().reverse());
    });
  });
});
