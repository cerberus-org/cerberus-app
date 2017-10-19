import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { testVisits, Visit } from '../models/visit';
import BaseService from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class VisitService extends BaseService {
  model = Visit;

  constructor(protected http: Http, protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'visit';
  }

  /**
   * Gets visits by organizationId.
   * @param {string} organizationId
   * @return {Observable<Visit[]>}
   */
  getByOrganization(organizationId: string): Observable<Visit[]> {
    return this.http.get(`/api/organization/${organizationId}/visits`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Gets visits by siteId.
   * @param {string} siteId
   * @return {Observable<Visit[]>}
   */
  getBySite(siteId: string): Observable<Visit[]> {
    return this.http.get(`/api/site/${siteId}/visits`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
  }

  /**
   * Get all dates that occur after the provided date.
   * @param {number} days
   * @return {Observable<Visit[]>}
   */
  getByLastGivenDays(days: number): Observable<Visit[]> {
    const date = new Date(new Date().getTime() - (days * 24 * 60 * 60 * 1000));
    return this.http.get(`/api/${this.modelName}s/${ date }`, this.options)
      .map(res => res.json().map(this.convertIn))
      .catch(this.errorService.handleHttpError);
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
    super(null, null);
  }

  getAll(): Observable<Visit[]> {
    return Observable.of(testVisits);
  }

  count(): Observable<number> {
    return Observable.of(testVisits.length);
  }

  create(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }

  getById(id: string): Observable<Visit> {
    return Observable.of(testVisits
      .find(visit => visit._id === id));
  }

  update(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }

  delete(obj: Visit): Observable<Visit> {
    return Observable.of(testVisits[0]);
  }
}
