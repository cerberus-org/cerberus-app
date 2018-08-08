import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getMemberForSelectedTeam } from '../../core/selectors/model.selectors';
import { isAdmin } from '../../shared/helpers';
import { Member, SidenavOptions } from '../../shared/models';
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
  getMemberForSelectedTeam,
  (member: Member): SidenavOptions[] => {
    const sidenavOptions = [
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadPage('USER_SETTINGS'),
      ),
    ];
    return member && isAdmin(member)
      ? [
        ...sidenavOptions,
        new SidenavOptions(
          'Team',
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
        new SidenavOptions(
          'Visits',
          'done_all',
          new SettingsActions.LoadPage('VISITS'),
        ),
        new SidenavOptions(
          'Sites',
          'dashboard',
          new SettingsActions.LoadPage('SITES'),
        ),
      ]
      : sidenavOptions;
  },
);
