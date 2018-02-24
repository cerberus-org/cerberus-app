import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';

import { upperAllFirst } from '../functions/capitalize';
import { Site, testSites } from '../models/site';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

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
    site.name = upperAllFirst(site.name);
    site.address = upperAllFirst(site.address);
    return site
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
    return Observable.of(testSites
      .filter(site => site[key] === value));
  }

  getById(id: string): Observable<Site> {
    return Observable.of(testSites
      .find(site => site.id === id));
  }

  add(site: Site): Observable<Site> {
    return Observable.of(site);
  }

  update(site: any): Observable<any> {
    return Observable.of(new Promise<void>());
  }

  delete(site: any): Observable<any> {
    return Observable.empty<any>();
  }
}
