import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Profile } from '../../shared/models';
import { ProfilesActionsUnion, ProfilesActionTypes } from '../actions/profiles.actions';
import { sortByName } from '../helpers/entity.helpers';

export interface ProfilesReducerState extends EntityState<Profile> {}

export const profilesAdapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  sortComparer: sortByName,
});

export const initialState: ProfilesReducerState = profilesAdapter.getInitialState();

export function profilesReducer(state = initialState, action: ProfilesActionsUnion): ProfilesReducerState {
  switch (action.type) {
    case ProfilesActionTypes.ProfileAdded: {
      return profilesAdapter.addOne(action.payload, state);
    }

    case ProfilesActionTypes.ProfileModified: {
      return profilesAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case ProfilesActionTypes.ProfileRemoved: {
      return profilesAdapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}
