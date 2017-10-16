import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testOrganizations, Organization } from '../models/organization';
import * as OrganizationActions from '../actions/organizations.actions'

@Injectable()
export class OrganizationService extends BaseService {

  constructor(protected http: Http,
              protected store: Store<Organization[]>,
              protected errorService: ErrorService) {
    super(http, null, errorService);
    this.modelName = 'organization';
    this.actions = {
      load: OrganizationActions.Load,
      add: OrganizationActions.Add,
      modify: OrganizationActions.Modify
    };
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

  getById (id: string): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  update(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }

  delete(obj: Organization): Observable<Organization> {
    return Observable.of(testOrganizations[0]);
  }
}
