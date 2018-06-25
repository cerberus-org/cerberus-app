import { StoreModule } from '@ngrx/store';
import { authReducers } from '../auth/store/reducers';
import { initialSessionReducerState } from '../auth/store/reducers/session.reducer';
import { rootReducers } from '../root/store/reducers';
import { initialModelReducerState } from '../root/store/reducers/model.reducer';
import { settingsReducers } from '../settings/store/reducers';
import { signUpReducers } from '../sign-up/store/reducers';
import { createMockOrganizations } from './objects/organization.mock';
import { createMockUsers } from './objects/user.mock';
import { createMockVolunteers } from './objects/volunteer.mock';

export const mockStoreModules = [
  StoreModule.forRoot(rootReducers, {
    initialState: {
      model: {
        ...initialModelReducerState,
        volunteers: createMockVolunteers(),
      },
    },
  }),
  StoreModule.forFeature('auth', authReducers, {
    initialState: {
      session: {
        ...initialSessionReducerState,
        organization: createMockOrganizations()[0],
        user: createMockUsers()[0],
      },
    },
  }),
  StoreModule.forFeature('settings', settingsReducers),
  StoreModule.forFeature('signUp', signUpReducers, {
    initialState: {
      gettingStarted: {
        maxVisitedStep: 4,
        validOrganization: createMockOrganizations()[0],
        validUser: createMockUsers()[0],
        tosIsChecked: true,
      },
    },
  }),
];
