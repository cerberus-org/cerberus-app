import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ModelReducerState } from '../reducers/model.reducer';

export const selectModelReducerState = createFeatureSelector<ModelReducerState>('model');

export const selectModelUsers = createSelector(
  selectModelReducerState,
  (state: ModelReducerState) => state.users,
);
