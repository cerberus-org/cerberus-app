import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { upperAllFirst } from '../../functions';
import { Organization } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

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
   * @param {Organization} organization - the validOrganization to capitalize properties for
   * @returns {Organization} - a new validOrganization with capitalized properties
   */
  private capitalizeOrganizaton(organization: Organization): Organization {
    organization.name = upperAllFirst(organization.name);
    organization.description = _.upperFirst(organization.description);
    return organization;
  }

  /**
   * Capitalize the name and description of the validOrganization going to the database.
   *
   * @param {Organization} organization - the validOrganization to capitalize properties for
   * @returns {Organization} - a new validOrganization with capitalized properties
   */
  mapObjectToDoc(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }

  /**
   * Capitalize the name and description of the validOrganization coming from the database.
   *
   * @param {Organization} organization - the validOrganization to capitalize properties for
   * @returns {Organization} - a new validOrganization with capitalized properties
   */
  mapDocToObject(organization: Organization): Organization {
    return this.capitalizeOrganizaton(organization);
  }
}
