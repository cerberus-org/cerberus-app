import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';
import { ADD_VOLUNTEER, LOAD_VOLUNTEERS, MODIFY_VOLUNTEER } from '../reducers/volunteer';

import { testVolunteers, Volunteer } from '../models/volunteer';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class VolunteerService extends BaseService {
  model = Volunteer;

  constructor(protected http: Http, protected store: Store<Volunteer[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'volunteer';
    this.actionTypes = {
      load: LOAD_VOLUNTEERS,
      add: ADD_VOLUNTEER,
      modify: MODIFY_VOLUNTEER,
    }
  }

  getByOrganizationRx(organizationId: string): void {
    this.http.get(`/api/organization/${organizationId}/volunteers`, this.options)
      .map(res => res.json().map(this.convert))
      .map(payload => ({ type: this.actionTypes.load, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }
}

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getAll(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  count(): Observable<number> {
    return Observable.of(testVolunteers.length);
  }

  create(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  get(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  update(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }

  delete(obj: Volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0]);
  }
}
