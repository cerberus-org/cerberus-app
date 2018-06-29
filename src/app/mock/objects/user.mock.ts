import * as _ from 'lodash';

export const mockUsers: any[] = [
  {
    uid: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    email: 'tlmader.dev@gmail.com',
  },
  {
    uid: '5961327dfba1ca1b64b8945b',
    email: 'hilllynn.dev@gmail.com',
  },
  {
    uid: '5961327dfba1ca1b64b8945c',
    email: 'lockeduser@gmail.com',
  },
];

export const createMockUsers = (users = mockUsers): any[] => _.cloneDeep(users);
