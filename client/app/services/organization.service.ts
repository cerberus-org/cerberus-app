import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Organization, testOrganizations } from '../models/organization';

@Injectable()
export class OrganizationService extends BaseService<Organization> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService);
    this.model = 'organization';
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
      .find(organization => organization.id === id));
  }

  count(): Observable<number> {
    return Observable.of(testOrganizations.length);
  }

  create(organization: Organization): Observable<Organization> {
    return Observable.of(organization);
  }

  update(organization: Organization): Observable<void> {
    return Observable.empty<void>();
  }

  delete(organization: Organization): Observable<void> {
    return Observable.empty<void>();
  }
}
