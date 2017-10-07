import { testVisits } from '../models/visit';
import * as fromDataDisplay from './data-display.reducer'
import * as DataDisplayActions from '../actions/data-display.actions';

describe('dataDisplayReducer', () => {

  describe('SETUP_LINE_CHART', () => {
    let payload;

    beforeEach(() => {
      payload = {
        visits: testVisits,
        latest: new Date('2017-07-01T14:45:42.336Z'),
        count: 3
      }
    });

    it('sets up the line chart labels', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState, new DataDisplayActions.SetupLineChart(payload));
      expect(state.lineChartLabels).toEqual(['Thu Jun 29 2017', 'Fri Jun 30 2017', 'Sat Jul 01 2017']);
    });

    it('sets up the line chart data', () => {
      const state = fromDataDisplay.reducer(fromDataDisplay.initialState, new DataDisplayActions.SetupLineChart(payload));
      const lineChartData = state.lineChartData[0];
      expect(lineChartData.data).toEqual([9, 5, 0]);
      expect(lineChartData.label).toEqual('Hours');
    });
  });
});
