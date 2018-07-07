import { StoreModule } from '@ngrx/store';
import { authReducers } from '../auth/store/reducers';
import { initialSessionReducerState } from '../auth/store/reducers/session.reducer';
import { rootReducers } from '../root/store/reducers';
import { initialModelReducerState } from '../root/store/reducers/model.reducer';
import { settingsReducers } from '../settings/store/reducers';
import { signUpReducers } from '../sign-up/store/reducers';
import { initialGettingStartedReducerState } from '../sign-up/store/reducers/getting-started.reducer';
import { createMockCredentials } from './objects/credentials.mock';
import { createMockMembers } from './objects/member.mock';
import { createMockOrganizations } from './objects/organization.mock';
import { createMockUserInfo } from './objects/user.mock';
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
        member: createMockMembers()[0],
        userInfo: createMockUserInfo()[0],
      },
    },
  }),
  StoreModule.forFeature('settings', settingsReducers),
  StoreModule.forFeature('signUp', signUpReducers, {
    initialState: {
      gettingStarted: {
        ...initialGettingStartedReducerState,
        maxVisitedStep: 4,
        joinExistingOrganization: false,
        validOrganization: createMockOrganizations()[0],
        validCredentials: createMockCredentials()[0],
        validMember: createMockMembers()[0],
        tosIsChecked: true,
      },
    },
  }),
];
