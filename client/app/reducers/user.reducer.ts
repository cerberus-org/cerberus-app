import { User } from '../models/user';
import * as UserActions from '../actions/user.actions'

export interface State {
  users: User[];
}

const initialState: State = {
  users: []
};

export type Action = UserActions.All;

export function userReducer(state = initialState, action: Action): State {
  switch (action.type) {
    case UserActions.LOAD: {
      return {
        users: action.payload
      };
    }

    case UserActions.ADD: {
      return {
        users: [action.payload, ...state.users]
      };
    }

    case UserActions.MODIFY: {
      return {
        users: state.users.map(user => {
          return user._id === action.payload._id ? action.payload : user;
        })
      };
    }

    default: {
      return state;
    }
  }
}
