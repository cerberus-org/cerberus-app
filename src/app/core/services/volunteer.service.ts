import { Injectable } from '@angular/core';
import { titleCase } from '../../shared/helpers';
import { Volunteer } from '../../shared/models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService extends BaseService<Volunteer> {
  collectionName = 'volunteers';

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer going to the database.
   *
   * @param {Volunteer} volunteer - the volunteer to be sent
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  mapObjectToDocument(volunteer: Volunteer): Volunteer {
    return this.capitalizeVolunteer(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer coming from the database.
   *
   * @param {Volunteer} volunteer - the volunteer received
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  mapDocumentToObject(volunteer: Volunteer): Volunteer {
    return this.capitalizeVolunteer(volunteer);
  }

  /**
   * Handles capitalization logic for volunteers.
   *
   * @param {Volunteer} volunteer - the volunteer to capitalize properties for
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  private capitalizeVolunteer(volunteer: Volunteer): Volunteer {
    return {
      ...volunteer,
      name: titleCase(volunteer.name),
      petName: titleCase(volunteer.petName),
    };
  }
}
