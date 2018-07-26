import { EMPTY, Observable, of } from 'rxjs';
import { OrganizationService } from '../../app/core/services/organization.service';
import { Organization } from '../../app/shared/models/index';
import { createMockOrganizations } from '../objects/organization.mock';

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Organization[]> {
    return of(createMockOrganizations());
  }

  getByKey(key: string, value: string): Observable<Organization[]> {
    return of(createMockOrganizations().filter(organization => organization[key] === value));
  }

  getById(id: string): Observable<Organization> {
    return of(createMockOrganizations().find(organization => organization.id === id));
  }

  add(organization: Organization): Observable<Organization> {
    return of(organization);
  }

  update(organization: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(organization: any): Observable<any> {
    return EMPTY;
  }
}
