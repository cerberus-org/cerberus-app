import * as AppActions from '../actions/app.actions';
import { testHeaderOptions } from '../models/header-options';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sidenavOptions: ['a', 'b'],
      headerOptions: testHeaderOptions[0]
    });
  });

  describe('SET_PAGE_CONFIG', () => {

    it('sets page config', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetPageConfig({
          sidenavOptions: ['a', 'b'],
          headerOptions: testHeaderOptions[0]
        }));
      expect(state.sidenavOptions).toEqual(['a', 'b']);
      expect(state.headerOptions).toEqual(testHeaderOptions[0]);
    });
  });
});
