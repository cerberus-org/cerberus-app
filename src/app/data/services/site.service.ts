import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { upperAllFirst } from '../../functions';
import { Site } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

@Injectable()
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
    return Object.assign({}, site, {
      name: upperAllFirst(site.name),
      address: upperAllFirst(site.address),
    });
  }

  /**
   * Capitalize the name and address of the site going to the database.
   *
   * @param {Site} site - the site to capitalize properties for
   * @returns {Site} - a new site with capitalized properties
   */
  convertOut(site: Site): Site {
    return this.capitalizeSite(site);
  }

  /**
   * Capitalize the name and address of the site coming from the database.
   *
   * @param {Site} site - the site to capitalize properties for
   * @returns {Site} - a new site with capitalized properties
   */
  convertIn(site: Site): Site {
    return this.capitalizeSite(site);
  }
}
