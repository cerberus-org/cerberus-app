import { StoreModule } from '@ngrx/store';
import { authReducers } from '../app/auth/reducers';
import { initialSessionReducerState } from '../app/auth/reducers/session.reducer';
import { appReducers } from '../app/core/reducers';
import { settingsReducers } from '../app/settings/reducers';
import { createMockHeaderOptions } from './objects/header-options.mock';
import { createMockMembers } from './objects/member.mock';
import { createMockSidenavOptions } from './objects/sidenav-options.mock';
import { createMockTeams } from './objects/team.mock';
import { createMockUserInfo } from './objects/user.mock';

export const mockStoreModules = [
  StoreModule.forRoot(appReducers, {
    initialState: {
      layout: {
        headerOptions: createMockHeaderOptions()[0],
        sidenavOptions: createMockSidenavOptions(),
        sidenavOpened: true,
      },
    },
  }),
  StoreModule.forFeature('authModule', authReducers, {
    initialState: {
      session: {
        ...initialSessionReducerState,
        team: createMockTeams()[0],
        member: createMockMembers()[0],
        userInfo: createMockUserInfo()[0],
      },
    },
  }),
  StoreModule.forFeature('settingsModule', settingsReducers),
];
