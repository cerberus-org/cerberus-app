import * as AppActions from '../actions/app.actions';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, { menu: ['a', 'b', 'c'] });
  });

  describe('SET_MENU', () => {

    it('sets menu', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetMenu(['a', 'b', 'c']));
      expect(state.menu).toEqual(['a', 'b', 'c']);
    });
  });
});
