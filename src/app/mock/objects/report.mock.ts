import * as _ from 'lodash';
import { Report } from '../../core/models';

export const mockReports: Report[] = [
  {
    startedAt: new Date('October 13, 2014 11:13:00'),
    endedAt: new Date(),
    title: 'Visit History',
  },
  {
    startedAt: new Date('April 10, 2013 11:13:00'),
    endedAt: new Date(),
    title: 'Def',
  },
];

export const createMockReports = (reports: Report[] = mockReports): Report[] => _.cloneDeep(reports);
