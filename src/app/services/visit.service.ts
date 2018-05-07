import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { testVisits, Visit } from '../models';
import { BaseService } from './base.service';
import { ErrorService } from './error.service';

@Injectable()
export class VisitService extends BaseService<Visit> {
  collectionName = 'visits';

  constructor(protected db: AngularFirestore,
              protected errorService: ErrorService) {
    super(db, errorService);
  }

  private convertDates(visit: Visit): Visit {
    return Object.assign({}, visit, {
      startedAt: new Date(visit.startedAt),
      endedAt: visit.endedAt ? new Date(visit.endedAt) : null,
    });
  }

  /**
   * Override to parse startedAt and endedAt Strings into Date objects and to stringify signature.
   * @param visit
   * @returns {any}
   */
  convertOut(visit: Visit): Visit {
    return Object.assign({}, this.convertDates(visit), {
      signature: visit.signature ? JSON.stringify(visit.signature) : null,
    });
  }

  /**
   * Override to parse startedAt and endedAt Strings into Date objects and to destringify signature.
   * @param visit
   */
  convertIn(visit: Visit): Visit {
    return Object.assign({}, this.convertDates(visit), {
      signature: visit.signature ? JSON.parse(visit.signature) : null,
    });
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
        visit.organizationId === organizationId,
      ));
  }

  add(visit: Visit): Observable<Visit> {
    return Observable.of(visit);
  }

  update(visit: any): Observable<any> {
    return Observable.of(Promise.resolve());
  }

  delete(visit: any): Observable<any> {
    return Observable.empty<any>();
  }
}
