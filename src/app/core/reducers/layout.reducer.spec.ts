import { mockHeaderOptions } from '../../../mocks/objects/header-options.mock';
import { mockSidenavOptions } from '../../../mocks/objects/sidenav-options.mock';
import { SetHeaderOptions, SetSidenavOptions } from '../actions/layout.actions';
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

  describe('SetHeaderOptions', () => {

    it('sets the header options', () => {
      const state = layoutReducer(
        undefined,
        new SetHeaderOptions({ headerOptions: mockHeaderOptions[0] }),
      );
      expect(state.headerOptions).toEqual(mockHeaderOptions[0]);
    });
  });

  describe('SetSidenavOptions', () => {

    it('sets the sidenav options', () => {
      const state = layoutReducer(
        undefined,
        new SetSidenavOptions({ sidenavOptions: mockSidenavOptions }),
      );
      expect(state.sidenavOptions).toEqual(mockSidenavOptions);
    });
  });
});
