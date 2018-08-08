import * as _ from 'lodash';
import { Volunteer } from '../../app/shared/models';

export const mockVolunteers: Volunteer[] = [{
  id: '5961327dfba1ca1b64b8945a',
  teamId: '59a7055733bfe28af47cff40',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Mimi',
}, {
  id: '5961327dfba1ca1b64b8945b',
  teamId: '59a7055733bfe28af47cff40',
  firstName: 'Hillary',
  lastName: 'Lynn',
  petName: 'Bandit',
}, {
  id: '5961327dfba1ca1b64b8945c',
  teamId: '59a7055733bfe28af47cff40',
  firstName: 'Ted',
  lastName: 'Mader',
  petName: 'Gam-Gam',
}];

export const createMockVolunteers = (volunteers: Volunteer[] = mockVolunteers): Volunteer[] => _.cloneDeep(volunteers);
