import { createFeatureSelector } from '@ngrx/store';
import { VolunteerSystemState } from '../reducers/index';

export const selectVolunteerSystemState = createFeatureSelector<VolunteerSystemState>('CheckIn');
