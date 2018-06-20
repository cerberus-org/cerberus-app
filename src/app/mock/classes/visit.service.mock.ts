import { EMPTY, Observable, of } from 'rxjs';
import { VisitService } from '../../data/services/visit.service';
import { Visit } from '../../models';
import { getMockVisits } from '../objects/visit.mock';

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
    return of(getMockVisits()
      .filter(visit =>
        visit.startedAt >= startDate &&
        (!visit.endedAt || visit.endedAt <= endDate) &&
        visit.organizationId === organizationId,
      ));
  }

  getAll(): Observable<Visit[]> {
    return of(getMockVisits());
  }

  getByKey(key: string, value: string): Observable<Visit[]> {
    return of(getMockVisits().filter(visit => visit[key] === value));
  }

  getById(id: string): Observable<Visit> {
    return of(getMockVisits().find(visit => visit.id === id));
  }

  add(visit: Visit): Observable<Visit> {
    return of(visit);
  }

  update(visit: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(visit: any): Observable<any> {
    return EMPTY;
  }
}
