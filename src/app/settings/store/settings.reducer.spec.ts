import * as SettingsActions from './settings.actions';
import * as fromSettings from './settings.reducer';

describe('settingsReducer', () => {
  describe('LOAD_PAGE', () => {
    it('sets the sidenav selection', () => {
      const state = fromSettings.reducer(
        fromSettings.initialState,
        new SettingsActions.LoadPage('organization'),
      );
      expect(state.sidenavSelection).toEqual('organization');
    });
  });
});
