import { Action } from '@ngrx/store';
import { Visit } from '../../shared/models';

export enum VisitsActionTypes {
  LoadVisits = '[visits] load visits',
  LoadVisitsForTeam = '[visits] load visits for team',
  LoadVisitsSuccess = '[visits] load visits success',
}

export class LoadVisits implements Action {
  readonly type = VisitsActionTypes.LoadVisits;
}

export class LoadVisitsForTeam implements Action {
  readonly type = VisitsActionTypes.LoadVisitsForTeam;

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
