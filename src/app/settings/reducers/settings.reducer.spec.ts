import * as SettingsActions from '../actions/settings.actions';
import * as fromSettings from './settings.reducer';

describe('settingsReducer', () => {
  describe('LOAD_PAGE', () => {
    it('sets the sidenav selection', () => {
      const state = fromSettings.settingsReducer(
        fromSettings.initialSettingsReducerState,
        new SettingsActions.LoadSettingsPage('team'),
      );
      expect(state.sidenavSelection).toEqual('team');
    });
  });
});
