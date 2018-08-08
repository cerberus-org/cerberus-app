import { initialCheckInReducerState } from '../reducers/check-in.reducer';
import { getCheckInReducerState, getSelectedTabIndex } from './check-in.selectors';

describe('CheckInSelectors', () => {
  describe('getCheckInReducerState', () => {
    it('should select the state', () => {
      const state = initialCheckInReducerState;
      expect(getCheckInReducerState.projector({
        checkIn: state,
      }))
        .toEqual(state);
    });
  });

  describe('getSelectedTabIndex', () => {
    it('should select the selected tab index', () => {
      const state = initialCheckInReducerState;
      expect(getSelectedTabIndex.projector(state))
        .toEqual(state.selectedTabIndex);
    });
  });
});
