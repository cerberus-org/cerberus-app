import { initialCheckInReducerState } from '../reducers/check-in.reducer';
import { selectCheckInReducerState, selectSelectedTabIndex } from './check-in.selectors';

describe('CheckInSelectors', () => {
  describe('selectCheckInReducerState', () => {
    it('should select the state', () => {
      const state = initialCheckInReducerState;
      expect(selectCheckInReducerState.projector({
        checkIn: state,
      }))
        .toEqual(state);
    });
  });

  describe('selectSelectedTabIndex', () => {
    it('should select the selected tab index', () => {
      const state = initialCheckInReducerState;
      expect(selectSelectedTabIndex.projector(state))
        .toEqual(state.selectedTabIndex);
    });
  });
});
