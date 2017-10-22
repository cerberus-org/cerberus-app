import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Site, testSites } from '../models/site';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class SiteService extends BaseService {

  constructor(protected http: Http, protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'site';
  }

  getByOrganizationId(organizationId: string): Observable<Site[]> {
    return this.http.get(`/api/organization/${organizationId}/sites`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }
}

export class MockSiteService extends SiteService {

  constructor() {
    super(null, null);
  }

  getByOrganizationId(organizationId: string): Observable<Site[]> {
    return Observable.of(testSites
      .filter(site => site.organizationId === organizationId));
  }

  // Base functions

  getAll(): Observable<Site[]> {
    return Observable.of(testSites);
  }

  getById(id: string): Observable<Site> {
    return Observable.of(testSites
      .find(site => site._id === id));
  }

  count(): Observable<number> {
    return Observable.of(testSites.length);
  }

  create(site: Site): Observable<Site> {
    return Observable.of(site);
  }

  update(site: Site): Observable<Site> {
    return Observable.of(site);
  }

  delete(site: Site): Observable<Site> {
    return Observable.of(site);
  }
}
