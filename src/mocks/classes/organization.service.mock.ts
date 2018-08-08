import { EMPTY, Observable, of } from 'rxjs';
import { OrganizationService } from '../../app/core/services/organization.service';
import { Team } from '../../app/shared/models';
import { createMockOrganizations } from '../objects/organization.mock';

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Team[]> {
    return of(createMockOrganizations());
  }

  getByKey(key: string, value: string): Observable<Team[]> {
    return of(createMockOrganizations().filter(organization => organization[key] === value));
  }

  getById(id: string): Observable<Team> {
    return of(createMockOrganizations().find(organization => organization.id === id));
  }

  add(organization: Team): Observable<Team> {
    return of(organization);
  }

  update(organization: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(organization: any): Observable<any> {
    return EMPTY;
  }
}
