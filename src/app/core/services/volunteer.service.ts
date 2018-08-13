import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { titleCase } from '../../shared/helpers';
import { Volunteer } from '../../shared/models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

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
    return this.capitalizeVolunteer(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer coming from the database.
   *
   * @param {Volunteer} volunteer - the volunteer received
   * @returns {Volunteer} - the volunteer with capitalized properties
   */
  mapDocToObject(volunteer: Volunteer): Volunteer {
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
