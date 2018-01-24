import * as SettingsActions from '../actions/settings.actions';
import { testVisits } from '../models/visit';
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

  describe('LOAD_VISITS_BY_DATES_SUCCESS', () => {

    it('loads visits by startedAt and endedAt', () => {
      const state = fromSettings.reducer(
        fromSettings.initialState,
        new SettingsActions.LoadVisitsByDateSuccess(testVisits)
      );
      expect(state.visits).toEqual(testVisits);
    });
  });
});
