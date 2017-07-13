import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';

@Injectable()
export abstract class BaseService {
  abstract model: any;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {
    return this.http.get('/api/visits')
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  count(): Observable<number> {
    return this.http.get('/api/visits/count')
      .map(res => res.json())
      .catch(handleError);
  }

  create(obj: any): Observable<any> {
    return this.http.post('/api/visit', JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  get(id: string): Observable<any> {
    return this.http.get(`/api/visit/${id}`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  update(obj: any): Observable<any> {
    return this.http.put(`/api/visit/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  delete(obj: any): Observable<any> {
    return this.http.delete(`/api/visit/${obj._id}`, this.options)
      .map(res => res.json())
      .catch(handleError);
  }
}
