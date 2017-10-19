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

  getByOrganization(organizationId: string): Observable<Volunteer[]> {
    return this.http.get(`/api/organization/${organizationId}/volunteers`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }
}

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  count(): Observable<number> {
    return Observable.of(testVolunteers.length);
  }

  create(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  getById(id: string): Observable<Volunteer> {
    return Observable.of(testVolunteers
      .find(volunteer => volunteer._id === id));
  }

  update(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  delete(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }
}
