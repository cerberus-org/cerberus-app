import { testVisits } from '../models/visit';
import * as fromDataDisplay from './data-display.reducer'
import * as DataDisplayActions from '../actions/data-display.actions';

describe('dataDisplayReducer', () => {

  describe('LOAD_DATA_SUCCESS', () => {

    it('loads visits in reverse', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
        new DataDisplayActions.LoadDataSuccess(testVisits));
      expect(state.visits).toEqual(testVisits.slice().reverse());
    });

    it('sets up the line chart labels', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
        new DataDisplayActions.LoadDataSuccess(testVisits));
      expect(state.lineChartLabels.length).toEqual(7);
    });

    it('sets up the line chart data', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState,
        new DataDisplayActions.LoadDataSuccess(testVisits));
      const lineChartData = state.lineChartData[0];
      expect(lineChartData.data.length).toEqual(7);
      expect(lineChartData.label).toEqual('Hours');
    });
  });
});
