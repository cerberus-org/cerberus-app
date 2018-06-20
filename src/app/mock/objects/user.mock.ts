import * as _ from 'lodash';
import { User } from '../../models';

export const mockUsers: User[] = [
  {
    id: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    organizationId: 'Y9oY2YPuxeWxB7x69Ayr',
    firstName: 'Ted',
    lastName: 'Mader',
    email: 'tlmader.dev@gmail.com',
    password: 'password',
    role: 'Owner',
  }, {
    id: '5961327dfba1ca1b64b8945b',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn',
    email: 'hilllynn.dev@gmail.com',
    password: 'testtest',
    role: 'Member',
  }, {
    id: '5961327dfba1ca1b64b8945c',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Locked',
    lastName: 'User',
    email: 'lockeduser@gmail.com',
    password: 'iamlocked',
    role: 'Locked',
  },
];

export const getMockUsers = (): User[] => _.cloneDeep(mockUsers);

export const mockLoginCredentials: any = [
  {
    email: 'tlmader.dev@gmail.com',
    password: 'test',
  },
  {
    email: 'hilllynn.dev@gmail.com',
    password: 'testtest',
  },
  {
    email: 'lockeduser@gmail.com',
    password: 'iamlocked',
  },
];

export const getMockLoginCredentials = (): User[] => _.cloneDeep(mockLoginCredentials);

export const mockFirebaseUsers: any[] = [
  {
    uid: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    email: 'tlmader.dev@gmail.com',
    password: 'password',
  },
  {
    uid: '5961327dfba1ca1b64b8945b',
    email: 'hilllynn.dev@gmail.com',
    password: 'testtest',
  },
  {
    uid: '5961327dfba1ca1b64b8945c',
    email: 'lockeduser@gmail.com',
    password: 'iamlocked',
  },
];

export const getMockFirebaseUsers = (): User[] => _.cloneDeep(mockFirebaseUsers);
