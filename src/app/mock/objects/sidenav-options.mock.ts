import * as _ from 'lodash';
import { SidenavOptions } from '../../models';

export const mockSidenavOptions: SidenavOptions[] = [
  {
    label: 'Go',
    icon: 'forward',
    action: null,
  },
];

export const createMockSidenavOptions = (sidenavOptions: SidenavOptions[] = mockSidenavOptions): SidenavOptions[] =>
  _.cloneDeep(sidenavOptions);
