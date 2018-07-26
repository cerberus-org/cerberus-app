import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { upperAllFirst } from '../../shared/helpers';
import { Organization } from '../../shared/models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
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
  mapObjectToDoc(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }

  /**
   * Capitalize the name and description of the organization coming from the database.
   *
   * @param {Organization} organization - the organization to capitalize properties for
   * @returns {Organization} - a new organization with capitalized properties
   */
  mapDocToObject(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }
}