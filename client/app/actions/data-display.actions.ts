import { Action } from '@ngrx/store';

import { Visit } from '../models/visit';

export const SETUP_LINE_CHART = '[Data Display] Set line chart labels';

export class SetupLineChart implements Action {
  readonly type = SETUP_LINE_CHART;

  constructor(public payload: Visit[]) {}
}

export type All
  = SetupLineChart;
