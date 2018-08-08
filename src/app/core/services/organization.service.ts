import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { upperAllFirst } from '../../shared/helpers';
import { Team } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseService<Team> {
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
   * @param {Team} organization - the organization to capitalize properties for
   * @returns {Team} - a new organization with capitalized properties
   */
  private capitalizeOrganizaton(organization: Team): Team {
    organization.name = upperAllFirst(organization.name);
    organization.description = _.upperFirst(organization.description);
    return organization;
  }

  /**
   * Capitalize the name and description of the organization going to the database.
   *
   * @param {Team} organization - the organization to capitalize properties for
   * @returns {Team} - a new organization with capitalized properties
   */
  mapObjectToDoc(organization: Team): Team {
    return this.capitalizeOrganizaton(organization);
  }

  /**
   * Capitalize the name and description of the organization coming from the database.
   *
   * @param {Team} organization - the organization to capitalize properties for
   * @returns {Team} - a new organization with capitalized properties
   */
  mapDocToObject(organization: Team): Team {
    return this.capitalizeOrganizaton(organization);
  }
}
