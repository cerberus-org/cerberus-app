import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { upperAllFirst } from '../../shared/helpers';
import { Site } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class SiteService extends BaseService<Site> {
  collectionName = 'sites';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for sites.
   *
   * @param {Site} site - the site to capitalize properties for
   * @returns {Site} - a new site with capitalized properties
   */
  private capitalizeSite(site: Site): Site {
    return {
      ...site,
      label: upperAllFirst(site.label),
      address: upperAllFirst(site.address),
      description: upperAllFirst(site.description),
    };
  }

  /**
   * Capitalize the name and address of the site going to the database.
   *
   * @param {Site} site - the site to capitalize properties for
   * @returns {Site} - a new site with capitalized properties
   */
  mapObjectToDoc(site: Site): Site {
    return this.capitalizeSite(site);
  }

  /**
   * Capitalize the name and address of the site coming from the database.
   *
   * @param {Site} site - the site to capitalize properties for
   * @returns {Site} - a new site with capitalized properties
   */
  mapDocToObject(site: Site): Site {
    return this.capitalizeSite(site);
  }
}
