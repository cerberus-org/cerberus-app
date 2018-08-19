import { Action } from '@ngrx/store';
import { Site } from '../../shared/models';

export enum SitesActionTypes {
  LoadSites = '[sites] load sites',
  LoadSitesForTeam = '[sites] load sites for team',
  SiteAdded = '[sites] added',
  SiteUpdated = '[sites] updated',
  SiteRemoved = '[sites] removed',
  SelectSite = '[sites] select site',
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

export class SiteUpdated implements Action {
  readonly type = SitesActionTypes.SiteUpdated;

  constructor(public payload: Site) {}
}

export class SiteRemoved implements Action {
  readonly type = SitesActionTypes.SiteRemoved;

  constructor(public payload: Site) {}
}

export class SelectSite implements Action {
  readonly type = SitesActionTypes.SelectSite;

  constructor(public payload: { siteId: string }) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type SitesActionsUnion =
  | LoadSites
  | LoadSitesForTeam
  | SiteAdded
  | SiteUpdated
  | SiteRemoved
  | SelectSite;
