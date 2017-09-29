import { User } from '../models/user';
import * as users from '../actions/users.actions'

export interface State {
  users: User[];
}

export const initialState: State = {
  users: []
};

export function userReducer(state = initialState, action: users.Actions): State {
  switch (action.type) {
    case users.LOAD: {
      return {
        users: action.payload
      };
    }

    case users.ADD: {
      return {
        users: [action.payload, ...state.users]
      };
    }

    case users.MODIFY: {
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
