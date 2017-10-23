import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

import { testVolunteers, Volunteer } from '../models/volunteer';
import BaseService from './base.service';
import { ErrorService } from './error.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class VolunteerService extends BaseService<Volunteer> {

  constructor(protected db: AngularFirestore, protected errorService: ErrorService) {
    super(db, errorService);
    this.model = 'volunteer';
  }
}

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  // Base functions

  getAll(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  getById(id: string): Observable<Volunteer> {
    return Observable.of(testVolunteers
      .find(volunteer => volunteer.id === id));
  }

  count(): Observable<number> {
    return Observable.of(testVolunteers.length);
  }

  create(volunteer: Volunteer): Observable<Volunteer> {
    return Observable.of(volunteer);
  }

  update(volunteer: Volunteer): Observable<void> {
    return Observable.empty<void>();
  }

  delete(volunteer: Volunteer): Observable<void> {
    return Observable.empty<void>();
  }
}
