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
    role: 'owner',
  }, {
    id: '5961327dfba1ca1b64b8945b',
    organizationId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn',
    email: 'harurang@gmail.com',
    password: null,
    role: 'member',
  },
];

export const getMockUsers = (): User[] => _.cloneDeep(mockUsers);

export const mockLoginCredentials: any = [{
  email: 'Test@gmail.com',
  password: 'test',
}];

export const mockFirebaseUsers: any[] = [
  {
    uid: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    email: 'tlmader.dev@gmail.com',
    password: 'password',
  },
];
