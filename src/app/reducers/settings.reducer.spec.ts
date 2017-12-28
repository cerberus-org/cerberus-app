import * as SettingsActions from '../actions/settings.actions';
import * as fromSettings from './settings.reducer'

describe('settingsReducer', () => {

  describe('SET_SIDENAV_SELECTION', () => {

    it('loads sidenav selection', () => {
      const state = fromSettings.reducer(
        fromSettings.initialState,
        new SettingsActions.SetSidenavSelection('Organization')
      );
      expect(state.sidenavSelection).toEqual('Organization');
    });
  });
});
