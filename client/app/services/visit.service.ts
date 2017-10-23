import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';

import BaseService from './base.service';
import { ErrorService } from './error.service';
import { testVisits, Visit } from '../models/visit';

@Injectable()
export class VisitService extends BaseService<Visit> {

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService);
    this.model = 'visit';
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

  // Base functions

  getAll(): Observable<Visit[]> {
    return Observable.of(testVisits);
  }

  getById(id: string): Observable<Visit> {
    return Observable.of(testVisits
      .find(visit => visit.id === id));
  }

  count(): Observable<number> {
    return Observable.of(testVisits.length);
  }

  create(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }

  update(visit: Visit): Observable<void> {
    return Observable.empty<void>();
  }

  delete(visit: Visit): Observable<void> {
    return Observable.empty<void>();
  }
}
