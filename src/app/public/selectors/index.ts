import { createFeatureSelector } from '@ngrx/store';
import { PublicState } from '../reducers/index';

export const selectPublicState = createFeatureSelector<PublicState>('public');
