import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import BaseService from './base.service';
import { testVisits, Visit } from '../models/visit';
import { ADD_VISIT, LOAD_VISITS, MODIFY_VISIT } from '../reducers/visit';
import ErrorService from './error.service';

@Injectable()
export class VisitService extends BaseService {
  model = Visit;
  modelName = 'visit';

  constructor(protected http: Http, private store: Store<Visit[]>, public errorService: ErrorService) {
    super(http, errorService);
  }

  getAllRx(): void {
    this.http.get(`/api/${this.modelName}s`, this.options)
      .map(res => res.json().map(this.convert))
      .map(payload => ({ type: LOAD_VISITS, payload: payload }))
      .subscribe(action => this.store.dispatch(action), err => this.errorService.handleHttpError(err));
  }

  createRx(obj: any, successCb): void {
    this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .map(payload => ({ type: ADD_VISIT, payload: payload }))
      .subscribe(action => this.store.dispatch(action), err => this.errorService.handleHttpError(err), successCb);
  }

  updateRx(obj: any, successCb): void {
    this.http.put(`/api/${this.modelName}/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .map(payload => ({ type: MODIFY_VISIT, payload: payload }))
      .subscribe(action => this.store.dispatch(action), err => this.errorService.handleHttpError(err), successCb);
  }

  /**
   * Get all dates that occur after the date provided.
   * @param date
   */
  getRxByDate(date: Date): void {
    this.http.get(`/api/${this.modelName}s/${ date }`, this.options)
      .map(res => res.json().map(this.convert))
      .map(payload => ({ type: LOAD_VISITS, payload: payload }))
      .subscribe(action => this.store.dispatch(action), err => this.errorService.handleHttpError(err));
  }

  /**
   * Override convert to parse strings into Date objects.
   * @param visit
   * @returns {any}
   */
  convert(visit) {
    visit.startedAt = new Date(visit.startedAt);
    visit.endedAt = visit.endedAt ? new Date(visit.endedAt) : null;
    return visit
  }
}

export class MockVisitService extends VisitService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getAll(): Observable<Visit[]> {
    return Observable.of(testVisits);
  }

  count(): Observable<number> {
    return Observable.of(testVisits.length);
  }

  create(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }

  get (obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }

  update(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }

  delete(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }
}
