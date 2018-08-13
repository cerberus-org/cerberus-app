import { Action } from '@ngrx/store';
import { Site } from '../../shared/models';

export enum SitesActionTypes {
  LoadSites = '[sites] load sites',
  LoadSitesForTeam = '[sites] load sites for team',
  SiteAdded = '[sites] added',
  SiteModified = '[sites] modified',
  SiteRemoved = '[sites] removed',
}

export class LoadSites implements Action {
  readonly type = SitesActionTypes.LoadSites;
}

export class LoadSitesForTeam implements Action {
  readonly type = SitesActionTypes.LoadSitesForTeam;

  constructor(public payload: { teamId: string }) {}
}

// AngularFire2 StateChanges

export class SiteAdded implements Action {
  readonly type = SitesActionTypes.SiteAdded;

  constructor(public payload: Site) {}
}

export class SiteModified implements Action {
  readonly type = SitesActionTypes.SiteModified;

  constructor(public payload: Site) {}
}

export class SiteRemoved implements Action {
  readonly type = SitesActionTypes.SiteRemoved;

  constructor(public payload: Site) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SitesActionsUnion =
  | LoadSites
  | LoadSitesForTeam
  | SiteAdded
  | SiteModified
  | SiteRemoved;
