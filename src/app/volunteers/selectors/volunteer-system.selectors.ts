import { createFeatureSelector } from '@ngrx/store';
import { VolunteerSystemState } from '../reducers';

export const selectVolunteerSystemState = createFeatureSelector<VolunteerSystemState>('CheckIn');
