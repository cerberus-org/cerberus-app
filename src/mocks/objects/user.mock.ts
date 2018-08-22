import * as _ from 'lodash';
import { User } from '../../app/shared/models';

export const mockUsers: User[] = [
  {
    id: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    name: 'Ted Mader',
  },
  {
    id: '5961327dfba1ca1b64b8945b',
    name: 'Hillary Lynn',
  },
];

export const createMockUsers = (users: User[] = mockUsers): User[] => _.cloneDeep(users);
