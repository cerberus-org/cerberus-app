import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Visit } from '../../shared/models';
import { ErrorService } from '../../shared/services/error.service';
import { BaseService } from './base.service';

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
    return this.getDocsFromCollection(
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
  mapObjectToDoc(visit: Visit): Visit {
    return {
      ...visit,
      startedAt: new Date(visit.startedAt),
      endedAt: visit.endedAt ? new Date(visit.endedAt) : null,
      signature: visit.signature ? JSON.stringify(visit.signature) : null,
    };
  }

  /**
   * Override to convert startedAt and endedAt (asserts types as Timestamp) into Dates and to destringify signature.
   * @param visit
   */
  mapDocToObject(visit: Visit): Visit {
    return {
      ...visit,
      // Double assertion to treat as Timestamp, since Firebase no longer returns a string
      startedAt: (visit.startedAt as any as firebase.firestore.Timestamp).toDate(),
      endedAt: visit.endedAt ? (visit.endedAt as any as firebase.firestore.Timestamp).toDate() : null,
      signature: visit.signature ? JSON.parse(visit.signature) : null,
    };
  }
}
