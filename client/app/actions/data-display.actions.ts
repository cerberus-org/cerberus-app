import { Action } from '@ngrx/store';
import { Visit } from '../models/visit';

export const MAP_VISITS_TO_DATES = '[Data Display] Map visits to dates';
export const SETUP_LINE_CHART = '[Data Display] Set line chart labels';
export const MODIFY = '[Data Display] Modify';

export class MapVisitsToDates implements Action {
  readonly type = MAP_VISITS_TO_DATES;

  constructor(public payload: Visit[]) {}
}

export class SetupLineChart implements Action {
  readonly type = SETUP_LINE_CHART;

  constructor(public payload: number) {}
}

export type All
  = MapVisitsToDates
  | SetupLineChart;
