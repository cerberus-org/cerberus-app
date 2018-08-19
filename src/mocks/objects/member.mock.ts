import * as _ from 'lodash';
import { Member } from '../../app/shared/models';
import { Roles } from '../../app/shared/models/roles';

export const mockMembers: Member[] = [
  {
    id: '1',
    userId: 'Fc59YPNibdPXlIjdRuBRIrizClI2',
    teamId: 'Y9oY2YPuxeWxB7x69Ayr',
    firstName: 'Ted',
    lastName: 'Mader',
    role: Roles.Owner,
  }, {
    id: '2',
    userId: '5961327dfba1ca1b64b8945b',
    teamId: '59a7055733bfe28af47cff40',
    firstName: 'Hillary',
    lastName: 'Lynn',
    role: Roles.Member,
  }, {
    id: '3',
    userId: '5961327dfba1ca1b64b8945c',
    teamId: '59a7055733bfe28af47cff40',
    firstName: 'Locked',
    lastName: 'User',
    role: Roles.Locked,
  },
];

export const createMockMembers = (members: Member[] = mockMembers): Member[] => _.cloneDeep(members);
