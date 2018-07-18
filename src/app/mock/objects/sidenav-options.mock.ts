import * as _ from 'lodash';
import { SidenavOptions } from '../../models';
import * as RouterActions from '../../root/store/actions/router.actions';

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
