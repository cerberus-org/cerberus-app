import { createFeatureSelector } from '@ngrx/store';
import { PublicState } from '../reducers';

export const selectPublicState = createFeatureSelector<PublicState>('public');
