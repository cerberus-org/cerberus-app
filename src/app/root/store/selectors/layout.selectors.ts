import { createFeatureSelector } from '@ngrx/store';
import { LayoutReducerState } from '../reducers/layout.reducer';

export const selectLayoutReducerState = createFeatureSelector<LayoutReducerState>('layout');
