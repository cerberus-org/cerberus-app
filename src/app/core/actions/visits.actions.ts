import { Action } from '@ngrx/store';
import { Visit } from '../../shared/models';

export enum VisitsActionTypes {
  LoadVisits = '[Visits] Load Visits',
  LoadVisitsForTeam = '[Visits] Load Visits for Team',
  LoadVisitsSuccess = '[Visits] Load Visits Success',
}

export class LoadVisits implements Action {
  readonly type = VisitsActionTypes.LoadVisits;
}

export class LoadVisitsForTeam implements Action {
  readonly type = VisitsActionTypes.LoadVisits;

  constructor(public payload: { teamId: string }) {}
}

export class LoadVisitsSuccess implements Action {
  readonly type = VisitsActionTypes.LoadVisitsSuccess;

  constructor(public payload: { visits: Visit[] }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type VisitsActionsUnion =
  | LoadVisits
  | LoadVisitsForTeam
  | LoadVisitsSuccess;
