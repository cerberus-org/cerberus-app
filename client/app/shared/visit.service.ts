import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Visit } from './visit';
import handleError from 'app/shared/handle-error';

@Injectable()
export class VisitService {

  constructor(private http: Http) { }

  getVisits(): Observable<Visit[]> {
    return this.http.get('/api/visits')
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  postVisit(visit): Observable<Visit> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('/api/visit', visit, options)
      .map((res: Response) => res.json())
      .catch(handleError);
  }
}
