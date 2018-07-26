import { mockHeaderOptions } from '../../../../mocks/objects/header-options.mock';
import { mockSidenavOptions } from '../../../../mocks/objects/sidenav-options.mock';
import * as LayoutActions from '../actions/layout.actions';
import { initialLayoutReducerState, layoutReducer } from './layout.reducer';

describe('layoutReducer', () => {
  let testState;

  beforeEach(() => {
    testState = {
      ...initialLayoutReducerState,
      sidenavOptions: ['a', 'b'],
      headerOptions: mockHeaderOptions[0],
    };
  });

  describe('SET_HEADER_OPTIONS', () => {

    it('sets the header options', () => {
      const state = layoutReducer(
        undefined,
        new LayoutActions.SetHeaderOptions(mockHeaderOptions[0]),
      );
      expect(state.headerOptions).toEqual(mockHeaderOptions[0]);
    });
  });

  describe('SET_SIDENAV_OPTIONS', () => {

    it('sets the sidenav options', () => {
      const state = layoutReducer(
        undefined,
        new LayoutActions.SetSidenavOptions(mockSidenavOptions),
      );
      expect(state.sidenavOptions).toEqual(mockSidenavOptions);
    });
  });
});
