import { createSelector } from '@ngrx/store';
import { VolunteersState } from '../reducers';
import { CheckInReducerState } from '../reducers/check-in.reducer';
import { getVolunteersState } from './index';

export const getCheckInReducerState = createSelector(
  getVolunteersState,
  (state: VolunteersState) => state.checkIn,
);

export const getSelectedTabIndex = createSelector(
  getCheckInReducerState,
  (state: CheckInReducerState) => state.selectedTabIndex,
);
