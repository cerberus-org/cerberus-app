import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSessionUser } from '../../../auth/store/selectors/session.selectors';
import { isAdmin } from '../../../functions';
import { SidenavOptions, User } from '../../../models';
import * as SettingsActions from '../actions/settings.actions';
import { SettingsState } from '../reducers';
import { SettingsReducerState } from '../reducers/settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectSettingsReducerState = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.settings,
);

export const selectSettingsSidenavSelection = createSelector(
  selectSettingsReducerState,
  (state: SettingsReducerState) => state.sidenavSelection,
);

export const selectSettingsSidenavOptions = createSelector(
  selectSessionUser,
  (sessionUser: User): SidenavOptions[] => {
    const sidenavOptions = [
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadPage('USER_SETTINGS'),
      ),
    ];
    return isAdmin(sessionUser)
      ? [
        ...sidenavOptions,
        new SidenavOptions(
          'Organization',
          'domain',
          new SettingsActions.LoadPage('ORGANIZATION_SETTINGS'),
        ),
        new SidenavOptions(
          'Volunteers',
          'insert_emoticon',
          new SettingsActions.LoadPage('VOLUNTEER_SETTINGS'),
        ),
        new SidenavOptions(
          'Reports',
          'assessment',
          new SettingsActions.LoadPage('REPORTS'),
        ),
        new SidenavOptions(
          'Roles',
          'lock_outline',
          new SettingsActions.LoadPage('ROLES'),
        ),
      ]
      : sidenavOptions;
  },
);
