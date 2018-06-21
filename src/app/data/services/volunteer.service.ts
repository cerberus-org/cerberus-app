import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { Volunteer } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

@Injectable()
export class VolunteerService extends BaseService<Volunteer> {
  collectionName = 'volunteers';

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer going to the database.
   * @param volunteer
   * @returns {any}
   */
  mapObjectToDoc(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer coming from the database.
   * @param volunteer
   * @returns {any}
   */
  mapDocToObject(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Handles capitalization logic for volunteers.
   * @param volunteer
   * @returns {any}
   */
  private capitalize(volunteer: Volunteer): Volunteer {
    volunteer.firstName = _.capitalize(volunteer.firstName);
    volunteer.lastName = _.capitalize(volunteer.lastName);
    volunteer.petName = _.capitalize(volunteer.petName);
    return Object.assign({}, volunteer, {
      firstName: _.capitalize(volunteer.firstName),
      lastName: _.capitalize(volunteer.lastName),
      petName: _.capitalize(volunteer.petName),
    });
  }
}
