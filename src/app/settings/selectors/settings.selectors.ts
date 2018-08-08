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
