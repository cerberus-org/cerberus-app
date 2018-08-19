import { Action } from '@ngrx/store';
import { Visit } from '../../shared/models';

export enum VisitsActionTypes {
  LoadVisits = '[visits] load visits',
  LoadVisitsForTeam = '[visits] load visits for team',
  VisitAdded = '[visits] added',
  VisitUpdated = '[visits] updated',
  VisitRemoved = '[visits] removed',
}

export class LoadVisits implements Action {
  readonly type = VisitsActionTypes.LoadVisits;
}

export class LoadVisitsForTeam implements Action {
  readonly type = VisitsActionTypes.LoadVisitsForTeam;

  constructor(public payload: { teamId: string }) {}
}

// AngularFire2 StateChanges

export class VisitAdded implements Action {
  readonly type = VisitsActionTypes.VisitAdded;

  constructor(public payload: Visit) {}
}

export class VisitUpdated implements Action {
  readonly type = VisitsActionTypes.VisitUpdated;

  constructor(public payload: Visit) {}
}

export class VisitRemoved implements Action {
  readonly type = VisitsActionTypes.VisitRemoved;

  constructor(public payload: Visit) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type VisitsActionsUnion =
  | LoadVisits
  | LoadVisitsForTeam
  | VisitAdded
  | VisitUpdated
  | VisitRemoved;
