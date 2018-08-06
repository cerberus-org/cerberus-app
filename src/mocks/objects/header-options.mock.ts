import * as _ from 'lodash';
import { HeaderOptions } from '../../app/shared/models';

export const mockHeaderOptions: HeaderOptions[] = [
  {
    title: 'Welcome',
    previousUrl: '/home',
    showLogOut: true,
  },
];

export const createMockHeaderOptions = (headerOptions: HeaderOptions[] = mockHeaderOptions): HeaderOptions[] =>
  _.cloneDeep(headerOptions);
