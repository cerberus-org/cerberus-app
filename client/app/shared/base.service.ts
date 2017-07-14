import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import handleError from './handle-error';

abstract class BaseService {
  abstract model: any;
  abstract modelName: string;

  constructor(protected http: Http) { }

  private get options() {
    const headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': localStorage.token });
    return new RequestOptions({ headers: headers });
  }

  getAll(): Observable<any[]> {
    return this.http.get(`/api/${this.modelName}s`)
      .map(res => res.json().map(this.convert))
      .catch(handleError);
  }

  count(): Observable<number> {
    return this.http.get(`/api/${this.modelName}s/count`)
      .map(res => res.json())
      .catch(handleError);
  }

  create(obj: any): Observable<any> {
    return this.http.post(`/api/${this.modelName}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .catch(handleError);
  }

  get(obj: any): Observable<any> {
    return this.http.get(`/api/${this.modelName}/${obj._id}`)
      .map(res => this.convert(res.json()))
      .catch(handleError);
  }

  update(obj: any): Observable<any> {
    return this.http.put(`/api/${this.modelName}/${obj._id}`, JSON.stringify(obj), this.options)
      .map(res => this.convert(res.json()))
      .catch(handleError);
  }

  delete(obj: any): Observable<any> {
    return this.http.delete(`/api/${this.modelName}/${obj._id}`, this.options)
      .map(res => this.convert(res.json()))
      .catch(handleError);
  }

  /**
   * Override this function to perform custom conversions to the data, e.g., converting date strings into Date objects (see VisitService).
   * @param data
   * @returns {any}
   */
  convert(data: any) {
    return data;
  }
}

export default BaseService
