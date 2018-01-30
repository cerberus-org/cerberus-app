import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { testVisits, Visit } from '../models/visit';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class VisitService extends BaseService<Visit> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService, 'visits');
  }

  /**
   * Override to parse startedAt and endedAt Strings into Date objects and to stringify signature.
   * @param visit
   * @returns {any}
   */
  convertOut(visit: Visit): Visit {
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
  convertIn(visit: Visit): Visit {
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

  getByKey(key: string, value: string): Observable<Visit[]> {
    return Observable.of(testVisits
      .filter(visit => visit[key] === value));
  }

  getById(id: string): Observable<Visit> {
    return Observable.of(testVisits
      .find(visit => visit.id === id));
  }

  getByDateAndOrganization(startDate: Date, endDate: Date, organizationId: string, snapshot?: boolean): Observable<Visit[]> {
    return Observable.of(testVisits
      .filter(visit =>
        visit.startedAt >= startDate &&
        (!visit.endedAt || visit.endedAt <= endDate) &&
        visit.organizationId === organizationId
      ));
  }

  add(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }

  update(visit: any): Observable<any> {
    return Observable.empty<any>();
  }

  delete(visit: any): Observable<any> {
    return Observable.empty<any>();
  }
}
