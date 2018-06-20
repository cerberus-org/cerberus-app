import { testHeaderOptions, testSidenavOptions } from '../../../models';
import * as AppActions from '../actions/app.actions';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sidenavOptions: ['a', 'b'],
      headerOptions: testHeaderOptions[0],
    });
  });

  describe('SET_HEADER_OPTIONS', () => {

    it('sets the header options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetHeaderOptions(testHeaderOptions[0]),
      );
      expect(state.headerOptions).toEqual(testHeaderOptions[0]);
    });
  });

  describe('SET_SIDENAV_OPTIONS', () => {

    it('sets the sidenav options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetSidenavOptions(testSidenavOptions),
      );
      expect(state.sidenavOptions).toEqual(testSidenavOptions);
    });
  });
});
