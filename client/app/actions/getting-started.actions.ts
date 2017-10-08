import { Action } from '@ngrx/store';
import { MdTabGroup } from '@angular/material';

export const LOAD_TAB_GROUP = '[Getting Started] Load tab group';
export const NEXT_STEP = '[Getting Started] Next step';

export class LoadTabGroup implements Action {
  readonly type = LOAD_TAB_GROUP;

  constructor(public payload: MdTabGroup) {}
}

export class NextStep implements Action {
  readonly type = NEXT_STEP;

  constructor(public payload: number) {}
}

export type All
  = LoadTabGroup
  | NextStep;
