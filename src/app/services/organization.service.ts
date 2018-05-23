import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/index';

import { upperAllFirst } from '../functions';
import { Organization, testOrganizations } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class OrganizationService extends BaseService<Organization> {
  collectionName = 'organizations';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  /**
   * Handles capitalization logic for organizations.
   *
   * @param {Organization} organization - the organization to capitalize properties for
   * @returns {Organization} - a new organization with capitalized properties
   */
  private capitalizeOrganizaton(organization: Organization): Organization {
    organization.name = upperAllFirst(organization.name);
    organization.description = _.upperFirst(organization.description);
    return organization;
  }

  /**
   * Capitalize the name and description of the organization going to the database.
   *
   * @param {Organization} organization - the organization to capitalize properties for
   * @returns {Organization} - a new organization with capitalized properties
   */
  convertOut(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }

  /**
   * Capitalize the name and description of the organization coming from the database.
   *
   * @param {Organization} organization - the organization to capitalize properties for
   * @returns {Organization} - a new organization with capitalized properties
   */
  convertIn(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }
}

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Organization[]> {
    return Observable.of(testOrganizations);
  }

  getByKey(key: string, value: string): Observable<Organization[]> {
    return Observable.of(testOrganizations.filter(organization => organization[key] === value));
  }

  getById(id: string): Observable<Organization> {
    return Observable.of(testOrganizations.find(organization => organization.id === id));
  }

  add(organization: Organization): Observable<Organization> {
    return Observable.of(organization);
  }

  update(organization: any): Observable<any> {
    return Observable.of(Promise.resolve());
  }

  delete(organization: any): Observable<any> {
    return Observable.empty();
  }
}
