import * as _ from 'lodash';
import { HeaderOptions } from '../../core/models';

export const mockHeaderOptions: HeaderOptions[] = [
  {
    title: 'Welcome',
    icon: 'sun',
    previousUrl: '/home',
    showSettings: true,
  },
];

export const createMockHeaderOptions = (headerOptions: HeaderOptions[] = mockHeaderOptions): HeaderOptions[] =>
  _.cloneDeep(headerOptions);
