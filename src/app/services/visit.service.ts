import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { empty, of } from 'rxjs';
import { Observable } from 'rxjs/index';

import { testVisits, Visit } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';
import Timestamp = firebase.firestore.Timestamp;

@Injectable()
export class VisitService extends BaseService<Visit> {
  protected collectionName = 'visits';

  constructor(
    protected db: AngularFirestore,
    protected errorService: ErrorService,
  ) {
    super(db, errorService);
  }

  getByOrganizationIdAndDateRange(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    snapshot?: boolean,
  ): Observable<Visit[]> {
    return this.getDataFromCollection(
      snapshot,
      this.collection(ref => ref
        .where('organizationId', '==', organizationId)
        .orderBy('startedAt').startAt(startDate).endAt(endDate)),
    );
  }

  /**
   * Override to parse startedAt and endedAt Strings into Dates and to stringify signature.
   * @param visit
   * @returns {any}
   */
  convertOut(visit: Visit): Visit {
    return Object.assign({}, visit, {
      startedAt: new Date(visit.startedAt),
      endedAt: visit.endedAt ? new Date(visit.endedAt) : null,
      signature: visit.signature ? JSON.stringify(visit.signature) : null,
    });
  }

  /**
   * Override to convert startedAt and endedAt (asserts types as Timestamp) into Dates and to destringify signature.
   * @param visit
   */
  convertIn(visit: Visit): Visit {
    return Object.assign({}, visit, {
      // Double assertion to treat as Timestamp, since Firebase no longer returns a string
      startedAt: (visit.startedAt as any as Timestamp).toDate(),
      endedAt: visit.endedAt ? (visit.endedAt as any as Timestamp).toDate() : null,
      signature: visit.signature ? JSON.parse(visit.signature) : null,
    });
  }
}

export class MockVisitService extends VisitService {

  constructor() {
    super(null, null);
  }

  getByOrganizationIdAndDateRange(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    snapshot?: boolean,
  ): Observable<Visit[]> {
    return of(testVisits
      .filter(visit =>
        visit.startedAt >= startDate &&
        (!visit.endedAt || visit.endedAt <= endDate) &&
        visit.organizationId === organizationId,
      ));
  }

  getAll(): Observable<Visit[]> {
    return of(testVisits);
  }

  getByKey(key: string, value: string): Observable<Visit[]> {
    return of(testVisits.filter(visit => visit[key] === value));
  }

  getById(id: string): Observable<Visit> {
    return of(testVisits.find(visit => visit.id === id));
  }

  add(visit: Visit): Observable<Visit> {
    return of(visit);
  }

  update(visit: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(visit: any): Observable<any> {
    return empty();
  }
}
