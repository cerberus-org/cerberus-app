import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Visit } from './visit';
import handleError from 'app/shared/handle-error';

@Injectable()
export class VisitService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getVisits(): Observable<Visit[]> {
    return this.http.get('/api/visits')
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  countVisits(): Observable<number> {
    return this.http.get('/api/visits/count')
      .map(res => res.json())
      .catch(handleError);
  }

  createVisit(visit: Visit): Observable<Visit> {
    console.log(JSON.stringify(visit));
    return this.http.post('/api/visit', JSON.stringify(visit), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  getVisit(visitId: string): Observable<Visit> {
    return this.http.get(`/api/visit/${visitId}`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  updateVisit(visit: Visit): Observable<Visit> {
    console.log(JSON.stringify(visit));
    return this.http.put(`/api/visit/${visit._id}`, JSON.stringify(visit), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  deleteVisit(visit: Visit): Observable<Visit> {
    return this.http.delete(`/api/visit/${visit._id}`, this.options)
      .map(res => res.json())
      .catch(handleError);
  }
}
