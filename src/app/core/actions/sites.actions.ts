import { Action } from '@ngrx/store';
import { Site } from '../../shared/models';

export enum SitesActionTypes {
  LoadSites = '[Sites] Load Sites',
  LoadSitesForTeam = '[Sites] Load Sites for Team',
  LoadSitesSuccess = '[Sites] Load Sites Success',
}

export class LoadSites implements Action {
  readonly type = SitesActionTypes.LoadSites;
}

export class LoadSitesForTeam implements Action {
  readonly type = SitesActionTypes.LoadSites;

  constructor(public payload: { teamId: string }) {}
}

export class LoadSitesSuccess implements Action {
  readonly type = SitesActionTypes.LoadSitesSuccess;

  constructor(public payload: { sites: Site[] }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SitesActionsUnion =
  | LoadSites
  | LoadSitesForTeam
  | LoadSitesSuccess;
