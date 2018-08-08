import { createMockMembers } from '../../../mocks/objects/member.mock';
import { initialSettingsReducerState } from '../reducers/settings.reducer';
import {
  getSettingsReducerState,
  getSettingsSidenavOptions,
  getSettingsSidenavSelection,
} from './settings.selectors';
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

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

  describe('getSettingsSidenavSelection', () => {
    it('it should select the sidenav selection', () => {
      const state = initialSettingsReducerState;
      expect(getSettingsSidenavSelection.projector(state))
        .toEqual(state.sidenavSelection);
    });
  });

  describe('getSettingsSidenavOptions', () => {
    it('it should select the correct sidenav options for a non-admin member', () => {
      const sidenavOptions = getSettingsSidenavOptions.projector(createMockMembers()[1]);
      expect(sidenavOptions).toEqual(arrayContaining([
        objectContaining({ label: 'User' }),
      ]));
      expect(sidenavOptions.length).toBe(1);
    });

    it('it should select the correct sidenav options for an admin member', () => {
      expect(getSettingsSidenavOptions.projector(createMockMembers()[0]))
        .toEqual(arrayContaining([
          objectContaining({ label: 'User' }),
          objectContaining({ label: 'Team' }),
          objectContaining({ label: 'Volunteers' }),
          objectContaining({ label: 'Reports' }),
          objectContaining({ label: 'Roles' }),
        ]));
    });
  });
});
