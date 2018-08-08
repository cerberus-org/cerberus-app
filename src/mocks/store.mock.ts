import { StoreModule } from '@ngrx/store';
import { authReducers } from '../app/auth/reducers';
import { initialSessionReducerState } from '../app/auth/reducers/session.reducer';
import { appReducers } from '../app/core/reducers';
import { initialModelReducerState } from '../app/core/reducers/model.reducer';
import { settingsReducers } from '../app/settings/reducers';
import { createMockHeaderOptions } from './objects/header-options.mock';
import { createMockMembers } from './objects/member.mock';
import { createMockSidenavOptions } from './objects/sidenav-options.mock';
import { createMockSites } from './objects/site.mock';
import { createMockTeams } from './objects/team.mock';
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
        teams: createMockTeams(),
        selectedTeamId: createMockTeams()[0].id,
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
