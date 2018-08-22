import { StoreModule } from '@ngrx/store';
import { authReducers } from '../app/auth/reducers';
import { initialAuthReducerState } from '../app/auth/reducers/auth.reducer';
import { appReducers } from '../app/core/reducers';
import { initialLayoutReducerState } from '../app/core/reducers/layout.reducer';
import { settingsReducers } from '../app/settings/reducers';
import { createMockHeaderOptions } from './objects/header-options.mock';
import { createMockSidenavOptions } from './objects/sidenav-options.mock';
import { createMockUserInfo } from './objects/user-info.mock';

export const mockStoreModules = [
  StoreModule.forRoot(appReducers, {
    initialState: {
      layout: {
        ...initialLayoutReducerState,
        headerOptions: createMockHeaderOptions()[0],
        sidenavOptions: createMockSidenavOptions(),
        sidenavOpened: true,
      },
    },
  }),
  StoreModule.forFeature('authModule', authReducers, {
    initialState: {
      auth: {
        ...initialAuthReducerState,
        userInfo: createMockUserInfo()[0],
      },
    },
  }),
  StoreModule.forFeature('settingsModule', settingsReducers),
];
