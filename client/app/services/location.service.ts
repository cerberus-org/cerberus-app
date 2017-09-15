import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { Location, testLocations } from '../models/location';

@Injectable()
export class LocationService extends BaseService {

  constructor(protected http: Http) {
    super(http);
    this.modelName = 'location';
  }
}

export class MockLocationService extends LocationService {

  constructor() {
    super(null);
  }

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
