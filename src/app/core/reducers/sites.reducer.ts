import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Site } from '../../shared/models';
import { SitesActionsUnion, SitesActionTypes } from '../actions/sites.actions';

export interface SitesReducerState extends EntityState<Site> {}

export const sitesAdapter: EntityAdapter<Site> = createEntityAdapter<Site>();

export const initialState: SitesReducerState = sitesAdapter.getInitialState();

export function sitesReducer(state = initialState, action: SitesActionsUnion): SitesReducerState {
  switch (action.type) {
    case SitesActionTypes.LoadSitesSuccess: {
      return sitesAdapter.addMany(action.payload.sites, state);
    }

    default: {
      return state;
    }
  }
}
