import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Organization, testOrganizations } from '../models/organization';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http,
              protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'organization';
  }
}

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Organization[]> {
    return Observable.of(testOrganizations);
  }

  count(): Observable<number> {
    return Observable.of(testOrganizations.length);
  }

  create(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  getById(id: string): Observable<Organization> {
    return Observable.of(testOrganizations
      .find(organization => organization._id === id));
  }

  update(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  delete(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }
}
