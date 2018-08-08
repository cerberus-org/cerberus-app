import * as _ from 'lodash';
import { Site } from '../../app/shared/models';

export const mockSites: Site[] = [
  {
    id: '59bc1e7ad92a6ac6f6252bfa',
    organizationId: '59a7055733bfe28af47cff40',
    label: 'Jefferson SPCA Animal Shelter',
    description: 'A Place',
    address: '1 Humane Way, New Orleans, LA 70123',
  },
  {
    id: '59bc1e7ad92a6ac6f6252bfa',
    organizationId: '59a7055733bfe28af47cff40',
    label: 'Jefferson Parish Animal Shelter',
    description: 'once upon a time',
    address: '2701 Lapalco Blvd, Harvey, LA 70058',
  },
];

export const createMockSites = (sites: Site[] = mockSites): Site[] => _.cloneDeep(sites);
