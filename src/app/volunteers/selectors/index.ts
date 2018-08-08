import { createFeatureSelector } from '@ngrx/store';
import { VolunteersState } from '../reducers';

export const getVolunteersState = createFeatureSelector<VolunteersState>('volunteers');
