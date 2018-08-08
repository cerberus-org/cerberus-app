import { ActionReducerMap } from '@ngrx/store';
import { checkInReducer, CheckInReducerState } from './check-in.reducer';

export interface VolunteersState {
  checkIn: CheckInReducerState;
}

export const volunteersReducers: ActionReducerMap<VolunteersState> = {
  checkIn: checkInReducer,
};
