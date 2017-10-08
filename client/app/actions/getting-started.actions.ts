import { Action } from '@ngrx/store';
import { MdTabGroup } from '@angular/material';

export const LOAD_TAB_GROUP = '[Getting Started] Load tab group';

export class LoadTabGroup implements Action {
  readonly type = LOAD_TAB_GROUP;

  constructor(public payload: MdTabGroup) {}
}

export type All
  = LoadTabGroup;
