import * as AppActions from '../actions/app.actions';
import { testHeaderOptions } from '../models/header-options';
import * as fromApp from './app.reducer';
import { testSidenavOptions } from '../models/sidenav-options';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sidenavOptions: ['a', 'b'],
      headerOptions: testHeaderOptions[0]
    });
  });

  describe('SET_PAGE_CONFIG', () => {

    it('sets the header options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SET_HEADER_OPTIONS(testHeaderOptions[0])
      );
      expect(state.headerOptions).toEqual(testHeaderOptions[0]);
    });

    it('sets the sidenav options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SET_SIDENAV_OPTIONS(testSidenavOptions)
      );
      expect(state.sidenavOptions).toEqual(testSidenavOptions);
    });
  });
});
