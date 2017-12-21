import * as AppActions from '../actions/app.actions';
import { testHeaderOptions } from '../models/header-options';
import { testSideNavOptions } from '../models/side-nav-options';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sideNavOptions: testSideNavOptions[0],
      headerOptions: testHeaderOptions[0]
    });
  });

  describe('SET_PAGE_CONFIG', () => {

    it('sets page config', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetPageConfig({
          sideNavOptions: testSideNavOptions[0],
          headerOptions: testHeaderOptions[0]
        }));
      expect(state.sideNavOptions).toEqual(testSideNavOptions[0]);
      expect(state.headerOptions).toEqual(testHeaderOptions[0]);
    });
  });
});
