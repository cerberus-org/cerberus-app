import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { testVisits, Visit } from '../models/visit';
import BaseService from './base.service';
import { ErrorService } from './error.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class VisitService extends BaseService {
  model = Visit;

  constructor(protected db: AngularFirestore,
              protected http: Http,
              protected errorService: ErrorService) {
    super(http, errorService);
    this.modelName = 'visit';
  }

  /**
   * Gets visits by organizationId.
   * @param {string} organizationId
   * @return {Observable<Visit[]>}
   */
  getByOrganizationId(organizationId: string): Observable<Visit[]> {
    return this.db.collection('visits').valueChanges()
  }

  /**
   * Gets visits by siteId.
   * @param {string} siteId
   * @return {Observable<Visit[]>}
   */
  getBySiteId(siteId: string): Observable<Visit[]> {
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
    super(null, null, null);
  }

  getByOrganizationId(organizationId): Observable<Visit[]> {
    return Observable.of(testVisits
      .filter(visit => visit.organizationId === organizationId));
  }

  getBySiteId(siteId): Observable<Visit[]> {
    return Observable.of(testVisits
      .filter(visit => visit.siteId === siteId));
  }

  // Base functions

  getAll(): Observable<Visit[]> {
    return Observable.of(testVisits);
  }

  getById(id: string): Observable<Visit> {
    return Observable.of(testVisits
      .find(visit => visit._id === id));
  }

  count(): Observable<number> {
    return Observable.of(testVisits.length);
  }

  create(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }

  update(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }

  delete(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }
}
