import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { testVolunteers, Volunteer } from './volunteer';
import handleError from './handle-error';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VolunteerService {
  public headers: Headers;
  public options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('authentication', localStorage.token);
    this.options = new RequestOptions({ headers: this.headers });
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get('/api/volunteers', this.options)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  postVolunteer(volunteer): Observable<Volunteer> {
    return this.http.post('/api/volunteer', volunteer, this.options)
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
