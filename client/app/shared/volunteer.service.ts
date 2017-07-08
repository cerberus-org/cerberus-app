import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { testVolunteers, Volunteer } from './volunteer';

@Injectable()
export class VolunteerService {

  constructor(private http: Http) {
  }

  getVolunteers(): Observable<Volunteer[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', localStorage.token);
    const options = new RequestOptions({ headers: headers })

    return this.http.get('/api/volunteers', options)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  postVolunteer(volunteer): Observable<Volunteer> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('authorization', localStorage.token);
    const options = new RequestOptions({ headers: headers })

    return this.http.post('/api/volunteer', volunteer, options)
      .map((res: Response) => res.json())
      .catch(handleError);
  }
}
export class MockVolunteerService extends VolunteerService {

  constructor() {
    super(null);
  }

  getVolunteers(): Observable<Volunteer[]> {
    return Observable.of(testVolunteers);
  }

  postVolunteer(volunteer): Observable<Volunteer> {
    return Observable.of(testVolunteers[0])
  }
}
