import * as _ from 'lodash';
import { Site } from '../../core/models';

export const mockSites: Site[] = [
  {
    id: '59a7055733bfe28af47cff40',
    organizationId: '59a7055733bfe28af47cff40',
    name: 'Jefferson SPCA Animal Shelter',
    address: '1 Humane Way, New Orleans, LA 70123',
  },
  {
    id: '59a7055733bfe28af47cff41',
    organizationId: '59a7055733bfe28af47cff40',
    name: 'Jefferson Parish Animal Shelter',
    address: '2701 Lapalco Blvd, Harvey, LA 70058',
  },
];

export const createMockSites = (sites: Site[] = mockSites): Site[] => _.cloneDeep(sites);
