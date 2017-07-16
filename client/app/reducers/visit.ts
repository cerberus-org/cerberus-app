import { ActionReducer, Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const GET_ALL = 'GET_ALL';

export const visitReducer = (state: Visit[] = [], action: Action) =>  {
  switch (action.type) {
  }
};

