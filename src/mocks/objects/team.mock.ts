import * as _ from 'lodash';
import { Team } from '../../app/shared/models';

export const mockTeams: Team[] = [
  {
    id: 'Y9oY2YPuxeWxB7x69Ayr',
    name: 'Jefferson SPCA',
    description: 'The Jefferson SPCA exists to support the Jefferson Parish Animal Shelter.',
    website: 'www.jeffersonspca.org',
  },
  {
    id: 'Y9oY2YPuxeWxB7x69Ayq',
    name: 'The Louisiana SPCA',
    description: 'Helping more than 43000 animals in Greater New Orleans every year.',
    website: 'www.la-spca.org',
  },
];

export const createMockTeams = (): Team[] => _.cloneDeep(mockTeams);
