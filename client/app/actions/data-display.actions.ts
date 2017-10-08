import { Action } from '@ngrx/store';
import * as moment from 'moment';

import { Visit } from '../models/visit';

export const SETUP_LINE_CHART = '[Data Display] Set line chart labels';

export class SetupLineChart implements Action {
  readonly type = SETUP_LINE_CHART;

  constructor(public payload: {
    visits: Visit[],
    latest: Date,
    count: number,
    format: string,
    unit: moment.unitOfTime.DurationConstructor
  }) {}
}

export type All
  = SetupLineChart;
