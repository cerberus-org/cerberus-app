import * as _ from 'lodash';
import { Member } from '../../app/shared/models';

export const mockMembers: Member[] = [
  {
    id: '1',
    userUid: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    teamId: 'Y9oY2YPuxeWxB7x69Ayr',
    firstName: 'Ted',
    lastName: 'Mader',
    role: 'Owner',
  }, {
    id: '2',
    userUid: '5961327dfba1ca1b64b8945b',
    teamId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn',
    role: 'Member',
  }, {
    id: '3',
    userUid: '5961327dfba1ca1b64b8945c',
    teamId: '59a7055733bfe28af47cff40',
    firstName: 'Locked',
    lastName: 'User',
    role: 'Locked',
  },
];

export const createMockMembers = (members: Member[] = mockMembers): Member[] => _.cloneDeep(members);
