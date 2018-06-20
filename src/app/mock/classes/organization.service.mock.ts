import { EMPTY, Observable, of } from 'rxjs';
import { OrganizationService } from '../../data/services/organization.service';
import { Organization } from '../../models';
import { getMockOrganizations } from '../objects/organization.mock';

export class MockOrganizationService extends OrganizationService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Organization[]> {
    return of(getMockOrganizations());
  }

  getByKey(key: string, value: string): Observable<Organization[]> {
    return of(getMockOrganizations().filter(organization => organization[key] === value));
  }

  getById(id: string): Observable<Organization> {
    return of(getMockOrganizations().find(organization => organization.id === id));
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
