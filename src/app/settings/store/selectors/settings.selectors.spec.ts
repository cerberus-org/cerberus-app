import { createMockMembers } from '../../../mock/objects/member.mock';
import { initialSettingsReducerState } from '../reducers/settings.reducer';
import {
  selectSettingsReducerState,
  selectSettingsSidenavOptions,
  selectSettingsSidenavSelection,
} from './settings.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

describe('SettingsSelectors', () => {
  describe('selectSettingsReducerState', () => {
    it('it should select the settingsReducer state', () => {
      const state = initialSettingsReducerState;
      expect(selectSettingsReducerState.projector({
        settings: state,
      }))
        .toEqual(state);
    });
  });

  describe('selectSettingsSidenavSelection', () => {
    it('it should select the sidenav selection', () => {
      const state = initialSettingsReducerState;
      expect(selectSettingsSidenavSelection.projector(state))
        .toEqual(state.sidenavSelection);
    });
  });

  describe('selectSettingsSidenavOptions', () => {
    it('it should select the correct sidenav options for a non-admin member', () => {
      expect(selectSettingsSidenavOptions.projector(createMockMembers()[0]))
        .toEqual(arrayContaining([
          objectContaining({ label: 'User' }),
        ]));
    });

    it('it should select the correct sidenav options for an admin member', () => {
      expect(selectSettingsSidenavOptions.projector(createMockMembers()[0]))
        .toEqual(arrayContaining([
          objectContaining({ label: 'User' }),
          objectContaining({ label: 'Organization' }),
          objectContaining({ label: 'Volunteers' }),
          objectContaining({ label: 'Reports' }),
          objectContaining({ label: 'Roles' }),
        ]));
    });
  });
});
