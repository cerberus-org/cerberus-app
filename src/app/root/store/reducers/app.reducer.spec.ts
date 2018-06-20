import { mockHeaderOptions } from '../../../mock/objects/header-options.mock';
import { mockSidenavOptions } from '../../../mock/objects/sidenav-options.mock';
import * as AppActions from '../actions/app.actions';
import * as fromApp from './app.reducer';

describe('appReducer', () => {
  let testState;

  beforeEach(() => {
    testState = Object.assign({}, fromApp.initialState, {
      sidenavOptions: ['a', 'b'],
      headerOptions: mockHeaderOptions[0],
    });
  });

  describe('SET_HEADER_OPTIONS', () => {

    it('sets the header options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetHeaderOptions(mockHeaderOptions[0]),
      );
      expect(state.headerOptions).toEqual(mockHeaderOptions[0]);
    });
  });

  describe('SET_SIDENAV_OPTIONS', () => {

    it('sets the sidenav options', () => {
      const state = fromApp.reducer(
        fromApp.initialState,
        new AppActions.SetSidenavOptions(mockSidenavOptions),
      );
      expect(state.sidenavOptions).toEqual(mockSidenavOptions);
    });
  });
});
