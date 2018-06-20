import { EMPTY, Observable, of } from 'rxjs';
import { VolunteerService } from '../../data/services/volunteer.service';
import { Volunteer } from '../../models';
import { getMockVolunteers } from '../objects/volunteer.mock';

export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null, null);
  }

  getAll(): Observable<Volunteer[]> {
    return of(getMockVolunteers());
  }

  getByKey(key: string, value: string): Observable<Volunteer[]> {
    return of(getMockVolunteers().filter(volunteer => volunteer[key] === value));
  }

  getById(id: string): Observable<Volunteer> {
    return of(getMockVolunteers().find(volunteer => volunteer.id === id));
  }

  add(volunteer: Volunteer): Observable<Volunteer> {
    return of(volunteer);
  }

  update(volunteer: any): Observable<any> {
    return of(Promise.resolve());
  }

  delete(volunteer: any): Observable<any> {
    return EMPTY;
  }
}
