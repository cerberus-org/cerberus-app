import { StoreModule } from '@ngrx/store';
import { authReducers } from '../app/auth/reducers';
import { initialSessionReducerState } from '../app/auth/reducers/session.reducer';
import { appReducers } from '../app/core/reducers';
import { initialModelReducerState } from '../app/core/reducers/model.reducer';
import { publicReducers } from '../app/public/reducers';
import { initialSignUpReducerState } from '../app/public/reducers/sign-up.reducer';
import { settingsReducers } from '../app/settings/reducers';
import { createMockCredentials } from './objects/credentials.mock';
import { createMockHeaderOptions } from './objects/header-options.mock';
import { createMockMembers } from './objects/member.mock';
import { createMockOrganizations } from './objects/organization.mock';
import { createMockSidenavOptions } from './objects/sidenav-options.mock';
import { createMockSites } from './objects/site.mock';
import { createMockUserInfo } from './objects/user.mock';
import { createMockVisits } from './objects/visit.mock';
import { createMockVolunteers } from './objects/volunteer.mock';

export const mockStoreModules = [
  StoreModule.forRoot(appReducers, {
    initialState: {
      layout: {
        headerOptions: createMockHeaderOptions()[0],
        sidenavOptions: createMockSidenavOptions(),
        sidenavOpened: true,
      },
      model: {
        ...initialModelReducerState,
        members: createMockMembers(),
        sites: createMockSites(),
        visits: createMockVisits(),
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
  StoreModule.forFeature('public', publicReducers, {
    initialState: {
      signUp: {
        ...initialSignUpReducerState,
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
