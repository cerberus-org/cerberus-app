import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import * as _ from 'lodash';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Organization, testOrganizations } from '../models/organization';

@Injectable()
export class OrganizationService extends BaseService<Organization> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService, 'organizations');
  }

  /**
   * Handles capitalization logic for organizations.
   * @param organization
   * @returns {any}
   */
  private capitalize(organization: Organization): Organization {
    organization.name = organization.name.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)));
    organization.description = _.upperFirst(organization.description);
    return organization
  }

  /**
   * Capitalize the name and description of the organization going to the database.
   * @param organization
   * @returns {any}
   */
  convertOut(organization: Organization): Organization {
    return this.capitalize(organization);
  }

  /**
   * Capitalize the name and description of the organization coming from the database.
   * @param organization
   * @returns {any}
   */
  convertIn(organization: Organization): Organization {
    return this.capitalize(organization);
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

  update(organization: any): Observable<any> {
    return Observable.empty<any>();
  }

  delete(organization: any): Observable<any> {
    return Observable.empty<any>();
  }
}
