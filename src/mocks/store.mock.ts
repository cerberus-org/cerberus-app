import { StoreModule } from '@ngrx/store';
import { authReducers } from '../app/auth/store/reducers';
import { initialSessionReducerState } from '../app/auth/store/reducers/session.reducer';
import { rootReducers } from '../app/core/store/reducers';
import { initialModelReducerState } from '../app/core/store/reducers/model.reducer';
import { initialSignUpReducerState } from '../app/public/store/reducers/sign-up.reducer';
import { publicReducers } from '../app/public/store/reducers';
import { settingsReducers } from '../app/settings/store/reducers';
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
  StoreModule.forRoot(rootReducers, {
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
      gettingStarted: {
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
