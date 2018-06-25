import { StoreModule } from '@ngrx/store';
import { authReducers } from '../auth/store/reducers';
import { initialSessionReducerState } from '../auth/store/reducers/session.reducer';
import { rootReducers } from '../root/store/reducers';
import { initialModelReducerState } from '../root/store/reducers/model.reducer';
import { signUpReducers } from '../sign-up/store/reducers';
import { getMockOrganizations } from './objects/organization.mock';
import { getMockUsers } from './objects/user.mock';
import { getMockVolunteers } from './objects/volunteer.mock';

export const mockStoreModules = [
  StoreModule.forRoot(rootReducers, {
    initialState: {
      model: {
        ...initialModelReducerState,
        volunteers: getMockVolunteers(),
      },
    },
  }),
  StoreModule.forFeature('auth', authReducers, {
    initialState: {
      session: {
        ...initialSessionReducerState,
        organization: getMockOrganizations()[0],
        user: getMockUsers()[0],
      },
    },
  }),
  StoreModule.forFeature('signUp', signUpReducers, {
    initialState: {
      gettingStarted: {
        maxVisitedStep: 4,
        validOrganization: getMockOrganizations()[0],
        validUser: getMockUsers()[0],
        tosIsChecked: true,
      },
    },
  }),
];
