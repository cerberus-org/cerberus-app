import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import * as _ from 'lodash';

import { testVolunteers, Volunteer } from '../models/volunteer';
import BaseService from './base.service';
import { ErrorService } from './error.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class VolunteerService extends BaseService<Volunteer> {

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService, 'volunteers');
  }

  /**
   * Capitalize the firstName, lastName, and petName of the volunteer going to the database.
   * @param volunteer
   * @returns {any}
   */
  convertOut(volunteer: Volunteer): Volunteer {
    return this.capitalize(volunteer);
  }

  /**
   * Capitalize the firstName, lastName, and petName of the volunteer coming from the database.
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
    return volunteer
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
    return Observable.empty<any>();
  }

  delete(volunteer: any): Observable<any> {
    return Observable.empty<any>();
  }
}
