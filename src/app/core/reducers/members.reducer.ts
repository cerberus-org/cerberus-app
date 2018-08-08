import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Member } from '../../shared/models';
import { MembersActionsUnion, MembersActionTypes } from '../actions/members.actions';

export interface State extends EntityState<Member> {
  selectedMemberId: string;
}

export const adapter: EntityAdapter<Member> = createEntityAdapter<Member>();

export const initialState: State = adapter.getInitialState({
  selectedMemberId: null,
});

export function reducer(state = initialState, action: MembersActionsUnion): State {
  switch (action.type) {
    case MembersActionTypes.LoadMembersSuccess: {
      return adapter.addMany(action.payload.members, state);
    }

    case MembersActionTypes.SelectMember: {
      return { ...state, selectedMemberId: action.payload.memberId };
    }

    default: {
      return state;
    }
  }
}
