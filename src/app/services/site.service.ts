import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import * as _ from 'lodash';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Site, testSites } from '../models/site';

@Injectable()
export class SiteService extends BaseService<Site> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService, 'sites');
  }

  /**
   * Capitalize the name and address of the site going to the database.
   * @param site
   * @returns {any}
   */
  convertOut(site: Site) {
    return this.capitalize(site);
  }

  /**
   * Capitalize the name and address of the site coming from the database.
   * @param site
   * @returns {any}
   */
  convertIn(site: Site) {
    return this.capitalize(site);
  }

  /**
   * Handles capitalization logic for sites.
   * @param site
   * @returns {any}
   */
  private capitalize(site) {
    site.name = _.startCase(site.name);
    site.address = _.startCase(site.address);
    return site
  }
}

export class MockSiteService extends SiteService {

  constructor() {
    super(null, null);
  }

  // Base functions

  getAll(): Observable<Site[]> {
    return Observable.of(testSites);
  }

  getById(id: string): Observable<Site> {
    return Observable.of(testSites
      .find(site => site.id === id));
  }

  count(): Observable<number> {
    return Observable.of(testSites.length);
  }

  create(site: Site): Observable<Site> {
    return Observable.of(site);
  }

  update(site: any): Observable<any> {
    return Observable.empty<any>();
  }

  delete(site: any): Observable<any> {
    return Observable.empty<any>();
  }
}
