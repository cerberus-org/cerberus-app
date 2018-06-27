import { createFeatureSelector } from '@ngrx/store';
import { SignUpState } from '../reducers';

export const selectSignUpState = createFeatureSelector<SignUpState>('signUp');
