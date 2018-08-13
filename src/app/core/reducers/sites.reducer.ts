import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Site } from '../../shared/models';
import { SitesActionsUnion, SitesActionTypes } from '../actions/sites.actions';
import { sortByName } from '../helpers/entity.helpers';

export interface SitesReducerState extends EntityState<Site> {}

export const sitesAdapter: EntityAdapter<Site> = createEntityAdapter<Site>({
  sortComparer: sortByName,
});

export const initialState: SitesReducerState = sitesAdapter.getInitialState();

export function sitesReducer(state = initialState, action: SitesActionsUnion): SitesReducerState {
  switch (action.type) {
    case SitesActionTypes.SiteAdded: {
      return sitesAdapter.addOne(action.payload, state);
    }

    case SitesActionTypes.SiteModified: {
      return sitesAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case SitesActionTypes.SiteRemoved: {
      return sitesAdapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}
