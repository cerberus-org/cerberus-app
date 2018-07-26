import * as _ from 'lodash';
import { SidenavOptions } from '../../app/shared/models/index';
import * as RouterActions from '../../app/core/actions/router.actions';

export const mockSidenavOptions: SidenavOptions[] = [
  {
    label: 'Go',
    icon: 'forward',
    action: new RouterActions.Go({ path: ['/home'] }),
  },
  {
    label: 'Back',
    icon: 'forward',
    action: new RouterActions.Back(),
  },
];

export const createMockSidenavOptions = (sidenavOptions: SidenavOptions[] = mockSidenavOptions): SidenavOptions[] =>
  _.cloneDeep(sidenavOptions);
