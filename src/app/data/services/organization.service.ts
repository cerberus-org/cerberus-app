import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { empty, Observable, of } from 'rxjs';
import { upperAllFirst } from '../../functions';
import { Organization, testOrganizations } from '../../models';
import { BaseService } from './base.service';
import { ErrorService } from '../../shared/services/error.service';

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
    return of(testOrganizations);
  }

  getByKey(key: string, value: string): Observable<Organization[]> {
    return of(testOrganizations.filter(organization => organization[key] === value));
  }

  getById(id: string): Observable<Organization> {
    return of(testOrganizations.find(organization => organization.id === id));
  }

  add(organization: Organization): Observable<Organization> {
    return of(organization);
  }

  update(organization: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(organization: any): Observable<any> {
    return empty();
  }
}
