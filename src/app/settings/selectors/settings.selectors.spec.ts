import { initialSettingsReducerState } from '../reducers/settings.reducer';
import { getSelectedSettingsOption, getSettingsReducerState } from './settings.selectors';

describe('settings.selectors', () => {
  describe('getSettingsReducerState', () => {
    it('it should select the state', () => {
      const state = initialSettingsReducerState;
      expect(getSettingsReducerState.projector({
        settings: state,
      }))
        .toEqual(state);
    });
  });

  describe('getSelectedSettingsOption', () => {
    it('it should select the sidenav selection', () => {
      const state = initialSettingsReducerState;
      expect(getSelectedSettingsOption.projector(state))
        .toEqual(state.selectedOption);
    });
  });
});
