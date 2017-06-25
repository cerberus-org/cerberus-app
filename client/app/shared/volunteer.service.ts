import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class VolunteerService {

  constructor(private http: Http) { }
  
  postVolunteer(volunteer) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/volunteer', volunteer, options)
      // map response to json and return Observable
      .map(res => res.json());
  }
  
  getVolunteers() {
    return this.http.get('/api/volunteers')
      // map response to json and return Observable
      .map(res => res.json());
  }
}
