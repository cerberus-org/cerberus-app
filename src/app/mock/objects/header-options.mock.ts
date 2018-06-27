import * as _ from 'lodash';
import { HeaderOptions } from '../../models';

export const mockHeaderOptions: HeaderOptions[] = [
  {
    title: 'Welcome',
    icon: 'sun',
    previousUrl: '/home',
    showSettings: true,
  },
];

export const createMockReports = (headerOptions: HeaderOptions[] = mockHeaderOptions): HeaderOptions[] =>
  _.cloneDeep(headerOptions);
