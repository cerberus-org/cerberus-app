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
      {
        label: 'User',
        icon: 'face',
        action: new SettingsActions.LoadSettingsPage('USER_SETTINGS'),
      },
    ];
    return member && isAdmin(member)
      ? [
        ...sidenavOptions,
        {
          label: 'User',
          icon: 'face',
          action: new SettingsActions.LoadSettingsPage('USER_SETTINGS'),
        },
        {
          label: 'Team',
          icon: 'domain',
          action: new SettingsActions.LoadSettingsPage('TEAM_SETTINGS'),
        },
        {
          label: 'Volunteers',
          icon: 'insert_emoticon',
          action: new SettingsActions.LoadSettingsPage('VOLUNTEER_SETTINGS'),
        },
        {
          label: 'Reports',
          icon: 'assessment',
          action: new SettingsActions.LoadSettingsPage('REPORTS'),
        },
        {
          label: 'Roles',
          icon: 'lock_outline',
          action: new SettingsActions.LoadSettingsPage('ROLES'),
        },
        {
          label: 'Visits',
          icon: 'done_all',
          action: new SettingsActions.LoadSettingsPage('VISITS'),
        },
        {
          label: 'Sites',
          icon: 'dashboard',
          action: new SettingsActions.LoadSettingsPage('SITES'),
        },
      ]
      : sidenavOptions;
  },
);
