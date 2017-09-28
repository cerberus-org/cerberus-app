import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testOrganizations, Organization } from '../models/organization';
import { ADD_ORGANIZATION, LOAD_ORGANIZATIONS, MODIFY_ORGANIZATION } from '../reducers/organization.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http,
              protected store: Store<Organization[]>,
              protected errorService: ErrorService) {
    super(http, null, errorService);
    this.modelName = 'organization';
    this.actionTypes = {
      load: LOAD_ORGANIZATIONS,
      add: ADD_ORGANIZATION,
      modify: MODIFY_ORGANIZATION
    }
  }
}

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null, null);
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
