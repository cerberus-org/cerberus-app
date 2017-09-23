import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { testOrganizations, Organization } from '../models/organization';
import { ErrorService } from './error.service';

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http, protected errorService: ErrorService) {
    super(http, null, errorService);
    this.modelName = 'organization';
  }
}

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAllRx(): void { }

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getAll(): Observable<Organization[]> {
    return Observable.of(testOrganizations);
  }

  count(): Observable<number> {
    return Observable.of(testOrganizations.length);
  }

  create(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  get (obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  update(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  delete(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }
}
