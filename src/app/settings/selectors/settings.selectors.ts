import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getMemberForUserAndSelectedTeam } from '../../core/selectors/members.selectors';
import { isAdmin } from '../../shared/helpers';
import { Member, SidenavOptions } from '../../shared/models';
import * as SettingsActions from '../actions/settings.actions';
import { SettingsState } from '../reducers';
import { SettingsReducerState } from '../reducers/settings.reducer';

export const getSettingsState = createFeatureSelector<SettingsState>('settingsModule');

export const getSettingsReducerState = createSelector(
  getSettingsState,
  (state: SettingsState) => state.settings,
);

export const getSettingsSidenavSelection = createSelector(
  getSettingsReducerState,
  (state: SettingsReducerState) => state.sidenavSelection,
);

export const getSettingsSidenavOptions = createSelector(
  getMemberForUserAndSelectedTeam,
  (member: Member): SidenavOptions[] => {
    const sidenavOptions = [
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadSettingsPage('USER_SETTINGS'),
      ),
    ];
    return member && isAdmin(member)
      ? [
        ...sidenavOptions,
        new SidenavOptions(
          'Team',
          'domain',
          new SettingsActions.LoadSettingsPage('TEAM_SETTINGS'),
        ),
        new SidenavOptions(
          'Volunteers',
          'insert_emoticon',
          new SettingsActions.LoadSettingsPage('VOLUNTEER_SETTINGS'),
        ),
        new SidenavOptions(
          'Reports',
          'assessment',
          new SettingsActions.LoadSettingsPage('REPORTS'),
        ),
        new SidenavOptions(
          'Roles',
          'lock_outline',
          new SettingsActions.LoadSettingsPage('ROLES'),
        ),
        new SidenavOptions(
          'Visits',
          'done_all',
          new SettingsActions.LoadSettingsPage('VISITS'),
        ),
        new SidenavOptions(
          'Sites',
          'dashboard',
          new SettingsActions.LoadSettingsPage('SITES'),
        ),
      ]
      : sidenavOptions;
  },
);
