import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { Location, testLocations } from '../models/location';
import { ADD_LOCATION, LOAD_LOCATIONS, MODIFY_LOCATION } from '../reducers/location';

@Injectable()
export class LocationService extends BaseService {

  constructor(protected http: Http, protected store: Store<Location[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'location';
    this.actionTypes = {
      getAll: LOAD_LOCATIONS,
      create: ADD_LOCATION,
      update: MODIFY_LOCATION
    };
  }
}

export class MockLocationService extends LocationService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

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
