import * as _ from 'lodash';
import { SidenavOptions } from '../../models';

export const mockSidenavOptions: SidenavOptions[] = [
  {
    label: 'Go',
    icon: 'forward',
    action: null,
  },
];

export const createMockReports = (sidenavOptions: SidenavOptions[] = mockSidenavOptions): SidenavOptions[] =>
  _.cloneDeep(sidenavOptions);
