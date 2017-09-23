import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import BaseService from './base.service';
import { testVisits, Visit } from '../models/visit';
import { ADD_VISIT, LOAD_VISITS, MODIFY_VISIT } from '../reducers/visit';
import { ErrorService } from './error.service';

@Injectable()
export class VisitService extends BaseService {
  model = Visit;

  constructor(protected http: Http, protected store: Store<Visit[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'visit';
    this.actionTypes = {
      load: LOAD_VISITS,
      add: ADD_VISIT,
      modify: MODIFY_VISIT
    }
  }

  /**
   * Get all dates that occur after the date provided.
   * @param days
   */
  getByLastGivenDaysRx(days: number): void {
    const date = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
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

  getByIdRx(id: string): void { }

  createRx(obj: any): void { }

  updateRx(obj: any): void { }

  getByLastGivenDaysRx(days: number): void { };

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
