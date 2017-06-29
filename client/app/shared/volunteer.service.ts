import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Volunteer from './volunteer';
import handleError from './handle-error';

@Injectable()
export class VolunteerService {

  constructor(private http: Http) { }

  postVolunteer(volunteer): Observable<Volunteer> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/volunteer', volunteer, options)
      .map(res => res.json())
      .catch(handleError);
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get('/api/volunteers')
      .map(res => res.json())
      .catch(handleError);
  }
}
