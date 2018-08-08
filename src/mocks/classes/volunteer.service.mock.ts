import { EMPTY, Observable, of } from 'rxjs';
import { VolunteerService } from '../../app/core/services/volunteer.service';
import { Volunteer } from '../../app/shared/models';
import { createMockVolunteers } from '../objects/volunteer.mock';

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Volunteer[]> {
    return of(createMockVolunteers());
  }

  getByKey(key: string, value: string): Observable<Volunteer[]> {
    return of(createMockVolunteers().filter(volunteer => volunteer[key] === value));
  }

  getById(id: string): Observable<Volunteer> {
    return of(createMockVolunteers().find(volunteer => volunteer.id === id));
  }

  add(volunteer: Volunteer): Observable<Volunteer> {
    return of(volunteer);
  }

  update(volunteer: any): Observable<any> {
    return of(Promise.resolve());
  }

  remove(volunteer: any): Observable<any> {
    return EMPTY;
  }
}
