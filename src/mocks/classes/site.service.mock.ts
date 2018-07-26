import { EMPTY, Observable, of } from 'rxjs';
import { SiteService } from '../../app/core/services/site.service';
import { Site } from '../../app/shared/models/index';
import { mockSites } from '../objects/site.mock';

export class MockSiteService extends SiteService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Site[]> {
    return of(mockSites);
  }

  getByKey(key: string, value: string): Observable<Site[]> {
    return of(mockSites.filter(site => site[key] === value));
  }

  getById(id: string): Observable<Site> {
    return of(mockSites.find(site => site.id === id));
  }

  add(site: Site): Observable<Site> {
    return of(site);
  }

  update(site: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(site: any): Observable<any> {
    return EMPTY;
  }
}
