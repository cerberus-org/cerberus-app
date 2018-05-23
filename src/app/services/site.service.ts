import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/index';

import { upperAllFirst } from '../functions';
import { Site, testSites } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

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

export class MockSiteService extends SiteService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Site[]> {
    return Observable.of(testSites);
  }

  getByKey(key: string, value: string): Observable<Site[]> {
    return Observable.of(testSites.filter(site => site[key] === value));
  }

  getById(id: string): Observable<Site> {
    return Observable.of(testSites.find(site => site.id === id));
  }

  add(site: Site): Observable<Site> {
    return Observable.of(site);
  }

  update(site: any): Observable<any> {
    return Observable.of(Promise.resolve());
  }

  delete(site: any): Observable<any> {
    return Observable.empty();
  }
}
