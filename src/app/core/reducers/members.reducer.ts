import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Member } from '../../shared/models';
import { MembersActionsUnion, MembersActionTypes } from '../actions/members.actions';

export interface MembersReducerState extends EntityState<Member> {
  selectedMemberId: string;
}

export const membersAdapter: EntityAdapter<Member> = createEntityAdapter<Member>();

export const initialMembersReducerState: MembersReducerState = membersAdapter.getInitialState({
  selectedMemberId: null,
});

export function membersReducer(state = initialMembersReducerState, action: MembersActionsUnion): MembersReducerState {
  switch (action.type) {
    case MembersActionTypes.MemberAdded: {
      return membersAdapter.upsertOne(action.payload, state);
    }

    case MembersActionTypes.MemberModified: {
      return membersAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }

    case MembersActionTypes.MemberRemoved: {
      return membersAdapter.removeOne(action.payload.id, state);
    }

    case MembersActionTypes.SelectMember: {
      return { ...state, selectedMemberId: action.payload.memberId };
    }

    default: {
      return state;
    }
  }
}
