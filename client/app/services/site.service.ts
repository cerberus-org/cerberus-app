import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Site, testSites } from '../models/site';
import * as SiteActions from '../actions/sites.actions'

@Injectable()
export class SiteService extends BaseService {

  constructor(protected http: Http, protected store: Store<Site[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'site';
    this.actions = {
      load: SiteActions.Load,
      add: SiteActions.Add,
      modify: SiteActions.Modify
    };
  }

  getByOrganizationId(organizationId: string): Observable<Site[]> {
    return this.http.get(`/api/organization/${organizationId}/sites`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }
}

export class MockSiteService extends SiteService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getByOrganizationId(organizationId: string): Observable<Site[]> {
    return Observable.of(testSites
      .filter(site => site.organizationId === organizationId));
  }

  getAll(): Observable<Site[]> {
    return Observable.of(testSites);
  }

  count(): Observable<number> {
    return Observable.of(testSites.length);
  }

  create(obj: Site): Observable<Site> {
    return Observable.of(testSites[0]);
  }

  getById(id: string): Observable<Site> {
    return Observable.of(testSites[0]);
  }

  update(obj: Site): Observable<Site> {
    return Observable.of(testSites[0]);
  }

  delete(obj: Site): Observable<Site> {
    return Observable.of(testSites[0]);
  }
}
