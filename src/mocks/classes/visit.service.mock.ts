import { EMPTY, Observable, of } from 'rxjs';
import { VisitService } from '../../app/core/services/visit.service';
import { Visit } from '../../app/shared/models';
import { createMockVisits } from '../objects/visit.mock';

export class MockVisitService extends VisitService {

  constructor() {
    super(null, null);
  }

  getByTeamIdAndDateRange(
    teamId: string,
    startDate: Date,
    endDate: Date,
    snapshot?: boolean,
  ): Observable<Visit[]> {
    return of(createMockVisits()
      .filter(visit =>
        visit.startedAt >= startDate &&
        (!visit.endedAt || visit.endedAt <= endDate) &&
        visit.teamId === teamId,
      ));
  }

  getAll(): Observable<Visit[]> {
    return of(createMockVisits());
  }

  getByKey(key: string, value: string): Observable<Visit[]> {
    return of(createMockVisits().filter(visit => visit[key] === value));
  }

  getById(id: string): Observable<Visit> {
    return of(createMockVisits().find(visit => visit.id === id));
  }

  add(visit: Visit): Observable<Visit> {
    return of(visit);
  }

  update(visit: any): Observable<any> {
    return of(Promise.resolve());
  }

  batchUpdate(visits: Visit[]): Observable<any> {
    return of(Promise.resolve());
  }

  remove(visit: any): Observable<any> {
    return EMPTY;
  }
}
