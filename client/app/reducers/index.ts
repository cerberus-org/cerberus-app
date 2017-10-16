import { ActionReducerMap } from '@ngrx/store';
import * as fromCheckIn from './check-in.reducer';
import * as fromDataDisplay from './data-display.reducer';
import * as fromGettingStarted from './getting-started.reducer';

export interface AppState {
  checkIn: fromCheckIn.State;
  dataDisplay: fromDataDisplay.State;
  gettingStarted: fromGettingStarted.State;
}

export const reducers: ActionReducerMap<AppState> = {
  checkIn: fromCheckIn.reducer,
  dataDisplay: fromDataDisplay.reducer,
  gettingStarted: fromGettingStarted.reducer
};
