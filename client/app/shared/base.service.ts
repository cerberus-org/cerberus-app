import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import handleError from './handle-error';
import { testVolunteers } from './volunteer';

@Injectable()
export abstract class BaseService {
  abstract model: any;
  abstract modelName: string;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {
    return this.http.get(`/api/${this.modelName}s`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  count(): Observable<number> {
    return this.http.get(`/api/${this.modelName}s/count`)
      .map(res => res.json())
      .catch(handleError);
  }

  create(obj: any): Observable<any> {
    return this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  get(obj: any): Observable<any> {
    return this.http.get(`/api/${this.modelName}/${obj._id}`)
      .map((res: Response) => res.json())
      .catch(handleError);
  }

  update(obj: any): Observable<any> {
    return this.http.put(`/api/${this.modelName}/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => res.json())
      .catch(handleError);
  }

  delete(obj: any): Observable<any> {
    return this.http.delete(`/api/${this.modelName}/${obj._id}`, this.options)
      .map(res => res.json())
      .catch(handleError);
  }
}

abstract class MockBaseService extends BaseService {
  abstract testData: any[];

  getAll(): Observable<any[]> {
    return Observable.of(this.testData);
  }

  count(): Observable<number> {
    return Observable.of(this.testData.length);
  }

  create(obj: any): Observable<any> {
    return Observable.of(this.testData[0]);
  }

  get(obj: any): Observable<any> {
    return Observable.of(this.testData[0]);
  }

  update(obj: any): Observable<any> {
    return Observable.of(this.testData[0]);
  }

  delete(obj: any): Observable<any> {
    return Observable.of(this.testData[0]);
  }
}
