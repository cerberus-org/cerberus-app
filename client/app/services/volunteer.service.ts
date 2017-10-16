import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testVolunteers, Volunteer } from '../models/volunteer';

@Injectable()
export class VolunteerService extends BaseService {
  model = Volunteer;

  constructor(protected http: Http, protected store: Store<Volunteer[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
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
    super(null, null, null);
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
    return Observable.of(testVolunteers[0]);
  }

  update(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  delete(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }
}
