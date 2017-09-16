import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import BaseService from './base.service';
import { Location, testLocations } from '../models/location';
import { ADD_LOCATION, LOAD_LOCATIONS } from '../reducers/location';

@Injectable()
export class LocationService extends BaseService {

  constructor(protected http: Http, private store: Store<Location[]>) {
    super(http);
    this.modelName = 'location';
  }

  getAllRx(): void {
    this.http.get(`/api/${this.modelName}s`, this.options)
      .map(res => res.json().map(this.convert))
      .map(payload => ({ type: LOAD_LOCATIONS, payload: payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  createRx(obj: any, successCb, errorCb): void {
    this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .map(payload => ({ type: ADD_LOCATION, payload: payload }))
      .subscribe(action => this.store.dispatch(action), errorCb, successCb);
  }
}

export class MockLocationService extends LocationService {

  constructor() {
    super(null, null);
  }

  getAllRx(): void { }

  createRx(obj: any): void { }

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
