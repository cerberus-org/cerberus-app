import * as SettingsActions from '../actions/settings.actions';
import { testVisits } from '../models/visit';
import * as fromSettings from './settings.reducer'

describe('settingsReducer', () => {

  describe('LOAD_PAGE', () => {

    it('loads sidenav selection', () => {
      const state = fromSettings.reducer(
        fromSettings.initialState,
        new SettingsActions.LoadPage('Organization')
      );
      expect(state.sidenavSelection).toEqual('Organization');
    });
  });
});
