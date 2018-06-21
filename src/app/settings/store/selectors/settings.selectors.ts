import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../reducers';
import { SettingsReducerState } from '../reducers/settings.reducer';

export const selectSettingsState = createFeatureSelector<SettingsState>('settings');

export const selectSettingsReducerState = createSelector(
  selectSettingsState,
  (state: SettingsState) => state.settings);

export const selectSidenavSelection = createSelector(
  selectSettingsReducerState,
  (state: SettingsReducerState) => state.sidenavSelection,
);
