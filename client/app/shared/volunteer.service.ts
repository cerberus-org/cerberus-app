import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class VolunteerService {
  private volunteerUrl = 'api/volunteer';

  constructor(private http: Http) { }
  
  postVolunteer(volunteer) {
    console.log(volunteer);
    // mock http request
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.volunteerUrl, volunteer, options)
      .map(res => res.json());
  }
}
