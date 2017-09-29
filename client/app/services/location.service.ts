import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Location, testLocations } from '../models/location';
import { ADD_LOCATION, LOAD_LOCATIONS, MODIFY_LOCATION } from '../reducers/locations.reducer';

@Injectable()
export class LocationService extends BaseService {

  constructor(protected http: Http, protected store: Store<Location[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'location';
    this.actionTypes = {
      load: LOAD_LOCATIONS,
      add: ADD_LOCATION,
      modify: MODIFY_LOCATION
    };
  }

  getByOrganizationRx(organizationId: string): void {
    this.http.get(`/api/organization/${organizationId}/locations`, this.options)
      .map(res => res.json().map(this.convertIn))
      .map(payload => ({ type: this.actionTypes.load, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }
}

export class MockLocationService extends LocationService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

  getByOrganizationRx(): void { }

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getAll(): Observable<Location[]> {
    return Observable.of(testLocations);
  }

  count(): Observable<number> {
    return Observable.of(testLocations.length);
  }

  create(obj: Location): Observable<Location> {
    return Observable.of(testLocations[0]);
  }

  get (obj: Location): Observable<Location> {
    return Observable.of(testLocations[0]);
  }

  update(obj: Location): Observable<Location> {
    return Observable.of(testLocations[0]);
  }

  delete(obj: Location): Observable<Location> {
    return Observable.of(testLocations[0]);
  }
}
