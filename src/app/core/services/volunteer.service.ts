import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { Volunteer } from '../../shared/models';
import { ErrorService } from './error.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class VolunteerService extends BaseService<Volunteer> {
  collectionName = 'volunteers';

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer going to the database.
   *
   * @param {Volunteer} volunteer - the volunteer to be sent
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  mapObjectToDoc(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer coming from the database.
   *
   * @param {Volunteer} volunteer - the volunteer received
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  mapDocToObject(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Handles capitalization logic for volunteers.
   *
   * @param {Volunteer} volunteer - the volunteer to capitalize properties for
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  private capitalize(volunteer: Volunteer): Volunteer {
    return {
      ...volunteer,
      firstName: _.capitalize(volunteer.firstName),
      lastName: _.capitalize(volunteer.lastName),
      petName: _.capitalize(volunteer.petName),
    };
  }
}
