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

  // Base functions

  getAll(): Observable<Organization[]> {
    return Observable.of(testOrganizations);
  }

  getById(id: string): Observable<Organization> {
    return Observable.of(testOrganizations
      .find(organization => organization._id === id));
  }

  count(): Observable<number> {
    return Observable.of(testOrganizations.length);
  }

  create(organization: Organization): Observable<Organization> {
    return Observable.of(organization);
  }

  update(organization: Organization): Observable<Organization> {
    return Observable.of(organization);
  }

  delete(organization: Organization): Observable<Organization> {
    return Observable.of(organization);
  }
}
