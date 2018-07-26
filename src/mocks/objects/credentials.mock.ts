import * as _ from 'lodash';
import { Credentials } from '../../app/shared/models/credentials';

export const mockCredentials: Credentials[] = [
  {
    email: 'tlmader.dev@gmail.com',
    password: 'password',
  }, {
    email: 'hilllynn.dev@gmail.com',
    password: 'testtest',
  }, {
    email: 'lockeduser@gmail.com',
    password: 'iamlocked',
  },
];

export const createMockCredentials = (credentials = mockCredentials): Credentials[] => _.cloneDeep(credentials);
