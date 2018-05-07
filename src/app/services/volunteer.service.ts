import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { testVolunteers, Volunteer } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

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
  convertOut(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the newVolunteer coming from the database.
   * @param volunteer
   * @returns {any}
   */
  convertIn(volunteer: Volunteer): Volunteer {
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

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  getByKey(key: string, value: string): Observable<Volunteer[]> {
    return Observable.of(testVolunteers
      .filter(volunteer => volunteer[key] === value));
  }

  getById(id: string): Observable<Volunteer> {
    return Observable.of(testVolunteers
      .find(volunteer => volunteer.id === id));
  }

  add(volunteer: Volunteer): Observable<Volunteer> {
    return Observable.of(volunteer);
  }

  update(volunteer: any): Observable<any> {
    return Observable.of(Promise.resolve());
  }

  delete(volunteer: any): Observable<any> {
    return Observable.empty<any>();
  }
}
