import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { testVolunteers, Volunteer } from '../models/volunteer';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class VolunteerService extends BaseService {
  model = Volunteer;

  constructor(protected http: Http, protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'volunteer';
  }

  getByOrganizationId(organizationId: string): Observable<Volunteer[]> {
    return this.http.get(`/api/organization/${organizationId}/volunteers`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }
}

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  getByOrganizationId(organizationId): Observable<Volunteer[]> {
    return Observable.of(testVolunteers
      .filter(visit => visit.organizationId === organizationId));
  }

  // Base functions

  getAll(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  getById(id: string): Observable<Volunteer> {
    return Observable.of(testVolunteers
      .find(volunteer => volunteer._id === id));
  }

  count(): Observable<number> {
    return Observable.of(testVolunteers.length);
  }

  create(volunteer: Volunteer): Observable<Volunteer> {
    return Observable.of(volunteer);
  }

  update(volunteer: Volunteer): Observable<Volunteer> {
    return Observable.of(volunteer);
  }

  delete(volunteer: Volunteer): Observable<Volunteer> {
    return Observable.of(volunteer);
  }
}
