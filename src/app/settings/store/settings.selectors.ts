import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../../reducers/settings.reducer';

export const selectSettings = createFeatureSelector<SettingsState>('settings');

export const selectSidenavSelection = createSelector(
  selectSettings,
  (state: SettingsState) => state.sidenavSelection,
);
