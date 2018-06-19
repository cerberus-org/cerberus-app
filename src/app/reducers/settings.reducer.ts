import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as SettingsActions from '../actions/settings.actions';

export interface SettingsState {
  sidenavSelection: string;
}

export const initialState: SettingsState = {
  sidenavSelection: 'user',
};
export type Action = SettingsActions.All;

export function reducer(state = initialState, action: Action): SettingsState {
  switch (action.type) {

    case SettingsActions.LOAD_PAGE: {
      return Object.assign({}, state, {
        sidenavSelection: action.payload,
      });
    }

    default: {
      return state;
    }
  }
}
