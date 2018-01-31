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

  describe('LOAD_VISITS_BY_DATE_AND_ORGANIZATION_SUCCESS', () => {

    it('loads visits', () => {
      const state = fromSettings.reducer(
        fromSettings.initialState,
        new SettingsActions.LoadVisitsByDateAndOrganizationSuccess(testVisits)
      );
      expect(state.visits).toEqual(testVisits);
    });
  });
});
