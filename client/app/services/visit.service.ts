import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testVisits, Visit } from '../models/visit';
import * as VisitsActions from '../actions/visits.actions'

@Injectable()
export class VisitService extends BaseService {
  model = Visit;

  constructor(protected http: Http, protected store: Store<Visit[]>, protected errorService: ErrorService) {
    super(http, store, errorService);
    this.modelName = 'visit';
    this.actions = {
      load: VisitsActions.Load,
      add: VisitsActions.Add,
      modify: VisitsActions.Modify
    }
  }

  getByOrganization(organizationId: string): Observable<Visit[]> {
    return this.http.get(`/api/organization/${organizationId}/visits`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }

  getBySiteRx(siteId: string): void {
    this.http.get(`/api/site/${siteId}/visits`, this.options)
      .map(res => res.json().map(this.convertIn))
      .map(payload => new this.actions.load(payload))
      .subscribe(action => this.store.dispatch(action));
  }

  /**
   * Get all dates that occur after the date provided.
   * @param days
   */
  getByLastGivenDaysRx(days: number): void {
    const date = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
    this.http.get(`/api/${this.modelName}s/${ date }`, this.options)
      .map(res => res.json().map(this.convertIn))
      .map(payload => new this.actions.load(payload))
      .subscribe(action => this.store.dispatch(action), err => this.errorService.handleHttpError(err));
  }

  /**
   * Override to parse startedAt and endedAt Strings into Date objects and to stringify signature.
   * @param visit
   * @returns {any}
   */
  convertOut(visit) {
    visit.startedAt = new Date(visit.startedAt);
    visit.endedAt = visit.endedAt ? new Date(visit.endedAt) : null;
    // If the visit contains a signature
    if (visit.signature) {
      visit.signature = JSON.stringify(visit.signature);
    }
    return visit
  }

  /**
   * Override to parse startedAt and endedAt Strings into Date objects and to destringify signature.
   * @param visit
   */
  convertIn(visit) {
    visit.startedAt = new Date(visit.startedAt);
    visit.endedAt = visit.endedAt ? new Date(visit.endedAt) : null;
    // If the visit contains a signature
    if (visit.signature) {
      visit.signature = JSON.parse(visit.signature);
    }
    return visit;
  }
}

export class MockVisitService extends VisitService {

  constructor() {
    super(null, null, null);
  }

  getAllRx(): void { }

  getByIdRx(id: string): void { }

  getBySiteRx(): void { }

  getByOrganizationRx(): void { }

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
